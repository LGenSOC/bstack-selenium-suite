const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

describe("Test Favorite Samsung Device", function () {
  this.timeout(300000); // 5 min timeout

  let driver;
  const browserstackUser = process.env.BROWSERSTACK_USERNAME;
  const browserstackKey = process.env.BROWSERSTACK_ACCESS_KEY;

  const browser = process.env.BROWSER || "Chrome";
  const os = process.env.OS || "Windows";
  const osVersion = process.env.OS_VERSION || "10.0";
  const device = process.env.DEVICE;

  before(async () => {
    const capabilities = {
      "bstack:options": {
        userName: browserstackUser,
        accessKey: browserstackKey,
        os: os,
        osVersion: osVersion,
        deviceName: device,
        realMobile: !!device,
        seleniumVersion: "4.0.0",
      },
      browserName: browser,
      browserVersion: "latest",
    };

    driver = await new Builder()
      .usingServer("https://hub.browserstack.com/wd/hub")
      .withCapabilities(capabilities)
      .build();
  });

  after(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it("should login, filter Samsung, favorite Galaxy S20+, and verify it in favorites", async () => {
    // Open main page
    await driver.get("https://www.bstackdemo.com/");

    // Click the Sign In button
    const signInBtn = await driver.wait(
      until.elementLocated(By.id("signin")),
      10000
    );
    await signInBtn.click();

    // Wait for login form to appear
    const usernameInput = await driver.wait(
      until.elementLocated(By.id("username")),
      10000
    );
    const passwordInput = await driver.findElement(By.id("password"));
    const loginBtn = await driver.findElement(By.id("login-btn"));

    // Fill in credentials and submit
    await usernameInput.sendKeys("demouser");
    await passwordInput.sendKeys("testingisfun99");
    await loginBtn.click();

    // Wait for product filter input to appear (login success)
    const filterInput = await driver.wait(
      until.elementLocated(By.css('input[placeholder="Filter by brand"]')),
      15000
    );

    // Filter for Samsung devices
    await filterInput.clear();
    await filterInput.sendKeys("Samsung");

    // Wait for filtered results to update
    await driver.sleep(3000);

    // Find Galaxy S20+ card
    const galaxyCard = await driver.findElement(
      By.xpath(
        "//*[contains(text(), 'Galaxy S20+')]//ancestor::div[contains(@class, 'product')]"
      )
    );

    // Click yellow heart icon inside that card to favorite
    const heartIcon = await galaxyCard.findElement(By.css(".heart"));
    await heartIcon.click();

    // Click on Favorites page link
    const favoritesLink = await driver.findElement(By.id("favourites"));
    await favoritesLink.click();

    // Verify Galaxy S20+ is listed in favorites
    await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Galaxy S20+')]")),
      10000
    );
    const favoriteDevice = await driver.findElement(
      By.xpath("//*[contains(text(), 'Galaxy S20+')]")
    );
    const isDisplayed = await favoriteDevice.isDisplayed();
    assert.strictEqual(
      isDisplayed,
      true,
      "Galaxy S20+ should be displayed in favorites"
    );
  });
});
