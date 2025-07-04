require("dotenv").config();

const { Builder, By, until } = require("selenium-webdriver");

const USERNAME = process.env.BROWSERSTACK_USERNAME;
const ACCESS_KEY = process.env.BROWSERSTACK_ACCESS_KEY;
const BROWSERSTACK_URL = `https://${USERNAME}:${ACCESS_KEY}@hub-cloud.browserstack.com/wd/hub`;

// Define the capabilities for each browser
const capabilities = [
  {
    browserName: "Chrome",
    "bstack:options": {
      os: "Windows",
      osVersion: "10",
      projectName: "BStackDemo",
      buildName: "Selenium Test Suite",
      sessionName: "Windows 10 Chrome Test",
      seleniumVersion: "4.0.0",
    },
  },
  {
    browserName: "Firefox",
    "bstack:options": {
      os: "macOS",
      osVersion: "Ventura",
      projectName: "BStackDemo",
      buildName: "Selenium Test Suite",
      sessionName: "macOS Ventura Firefox Test",
      seleniumVersion: "4.0.0",
    },
  },
  {
    browserName: "Chrome",
    "bstack:options": {
      deviceName: "Samsung Galaxy S22",
      osVersion: "12.0",
      realMobile: true,
      projectName: "BStackDemo",
      buildName: "Selenium Test Suite",
      sessionName: "Samsung Galaxy S22 Test",
      seleniumVersion: "4.0.0",
    },
  },
];

// Dummy credentials
const username = "demouser";
const password = "testingisfun99";

async function runTest(caps) {
  let driver;
  try {
    console.log(`Starting test on: ${caps["bstack:options"].sessionName}`);
    driver = await new Builder()
      .usingServer(BROWSERSTACK_URL)
      .withCapabilities(caps)
      .build();

    await driver.get("https://www.bstackdemo.com/");

    // 1. Log in
    await driver.findElement(By.id("signin")).click();
    await driver.wait(until.elementLocated(By.id("username")), 10000);
    await driver.findElement(By.id("username")).sendKeys(username);
    await driver.findElement(By.id("password")).sendKeys(password);
    await driver.findElement(By.id("login-btn")).click();

    await driver.wait(until.elementLocated(By.id("orders")), 10000);
    console.log("Successfully logged in.");

    // 2. Filter by Samsung
    await driver.findElement(By.xpath('//span[text()="Samsung"]')).click();
    await driver.sleep(2000);
    console.log("Filtered by Samsung devices.");

    // 3. Favorite "Galaxy S20+"
    const galaxyS20PlusXPath =
      "//div[contains(text(), 'Galaxy S20+')]/following-sibling::div/div[contains(@class, 'MuiButtonBase-root')]";
    await driver.wait(
      until.elementLocated(By.xpath(galaxyS20PlusXPath)),
      10000
    );
    await driver.findElement(By.xpath(galaxyS20PlusXPath)).click();
    console.log("Favorited Galaxy S20+.");

    // 4. Verify on Favorites page
    await driver.findElement(By.id("favourites")).click();
    await driver.wait(until.urlContains("favourites"), 10000);
    await driver.sleep(2000);

    const isGalaxyS20PlusPresent = await driver
      .findElement(By.xpath("//div[contains(text(), 'Galaxy S20+')]"))
      .isDisplayed();

    if (isGalaxyS20PlusPresent) {
      console.log(
        "Verification successful: Galaxy S20+ is listed on the Favorites page."
      );
    } else {
      throw new Error("Galaxy S20+ not found on favorites page.");
    }
  } catch (error) {
    console.error(
      `Test failed for ${caps["bstack:options"].sessionName}:`,
      error
    );
    if (driver) {
      await driver.executeScript(
        `browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "${error.message}"}}`
      );
    }
    throw error;
  } finally {
    if (driver) {
      await driver.executeScript(
        `browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Test completed successfully"}}`
      );
      await driver.quit();
      console.log(`Test finished for: ${caps["bstack:options"].sessionName}`);
    }
  }
}

// Run tests in parallel
(async function runAllTests() {
  const promises = capabilities.map((cap) => runTest(cap));
  try {
    await Promise.all(promises);
    console.log("All tests completed successfully!");
  } catch (error) {
    console.error("One or more tests failed:", error);
    process.exit(1);
  }
})();
