const { Builder, By, until } = require("selenium-webdriver");
require("dotenv").config();
const assert = require("assert");

describe("Test Favorite Samsung Device", function () {
  this.timeout(60000); // allow extra time

  const capabilitiesList = [
    {
      os: "Windows",
      os_version: "10",
      browserName: "Chrome",
      "browserstack.user": process.env.BROWSERSTACK_USERNAME,
      "browserstack.key": process.env.BROWSERSTACK_ACCESS_KEY,
      build: "BSTACK Beginner Test",
      name: "Test on Win10 Chrome",
    },
    {
      os: "OS X",
      os_version: "Ventura",
      browserName: "Firefox",
      "browserstack.user": process.env.BROWSERSTACK_USERNAME,
      "browserstack.key": process.env.BROWSERSTACK_ACCESS_KEY,
      build: "BSTACK Beginner Test",
      name: "Test on macOS Firefox",
    },
    {
      device: "Samsung Galaxy S22",
      realMobile: "true",
      browserName: "Chrome",
      "browserstack.user": process.env.BROWSERSTACK_USERNAME,
      "browserstack.key": process.env.BROWSERSTACK_ACCESS_KEY,
      build: "BSTACK Beginner Test",
      name: "Test on Galaxy S22",
    },
  ];

  capabilitiesList.forEach((caps) => {
    it(
      "should favorite Galaxy S20+ on " + (caps.browserName || caps.device),
      async function () {
        const driver = new Builder()
          .usingServer(
            "https://" +
              process.env.BROWSERSTACK_USERNAME +
              ":" +
              process.env.BROWSERSTACK_ACCESS_KEY +
              "@hub-cloud.browserstack.com/wd/hub"
          )
          .withCapabilities(caps)
          .build();

        try {
          await driver.get("https://www.bstackdemo.com");

          // Wait for username input to be located and visible, then send keys
          const usernameInput = await driver.wait(
            until.elementLocated(By.id("username")),
            15000
          );
          await driver.wait(until.elementIsVisible(usernameInput), 15000);
          await usernameInput.sendKeys("demouser");

          // Wait for password input to be located and visible, then send keys
          const passwordInput = await driver.wait(
            until.elementLocated(By.id("password")),
            15000
          );
          await driver.wait(until.elementIsVisible(passwordInput), 15000);
          await passwordInput.sendKeys("testingisfun99");

          // Wait for login button to be located and visible, then click
          const loginBtn = await driver.wait(
            until.elementLocated(By.css("button[type='submit']")),
            15000
          );
          await driver.wait(until.elementIsVisible(loginBtn), 15000);
          await loginBtn.click();

          // Wait for filter and click Samsung
          await driver.wait(until.elementLocated(By.css(".filter")), 15000);
          const samsungFilter = await driver.findElement(
            By.css("label[for='samsung']")
          );
          await samsungFilter.click();

          // wait a bit for page to update
          await driver.sleep(2000);

          // favorite Galaxy S20+
          const heartIcon = await driver.findElement(
            By.css("div[data-testid='Galaxy S20+'] .wishlistIcon")
          );
          await heartIcon.click();

          // go to favorites page
          await driver.findElement(By.id("wishlist-link")).click();

          // verify Galaxy S20+ is present
          const favoriteItem = await driver.findElement(
            By.css("div[data-testid='Galaxy S20+']")
          );
          const isDisplayed = await favoriteItem.isDisplayed();
          assert.strictEqual(
            isDisplayed,
            true,
            "Galaxy S20+ should be in favorites"
          );
        } finally {
          await driver.quit();
        }
      }
    );
  });
});
