const { Builder, By, until } = require("selenium-webdriver");
const { describe, it, before, after } = require("mocha");

require("dotenv").config();

const USERNAME = process.env.BROWSERSTACK_USERNAME;
const ACCESS_KEY = process.env.BROWSERSTACK_ACCESS_KEY;

const capabilities = {
  "bstack:options": {
    os: "Windows",
    osVersion: "10",
    buildName: "WebDriver Challenge Build",
    sessionName: "Login and Favorite Samsung",
    userName: USERNAME,
    accessKey: ACCESS_KEY,
  },
  browserName: "Chrome",
};

describe("Test Favorite Samsung Device", function () {
  this.timeout(60000);
  let driver;

  before(async function () {
    driver = await new Builder()
      .usingServer("https://hub.browserstack.com/wd/hub")
      .withCapabilities(capabilities)
      .build();
  });

  after(async function () {
    await driver.quit();
  });

  it("should log in and favorite Galaxy S20+", async function () {
    await driver.get("https://www.bstackdemo.com/signin");

    // Fill in credentials
    await driver.findElement(By.id("username")).sendKeys("demouser");
    await driver.findElement(By.id("password")).sendKeys("testingisfun99");

    // Click login
    await driver.findElement(By.id("login-btn")).click();

    // Wait for Samsung filter checkbox
    await driver.wait(
      until.elementLocated(By.css('input[type="checkbox"][value="Samsung"]')),
      10000
    );

    // Filter to Samsung
    await driver
      .findElement(By.css('input[type="checkbox"][value="Samsung"]'))
      .click();

    // Wait for Galaxy S20+ card
    await driver.wait(
      until.elementLocated(By.xpath('//p[text()="Galaxy S20+"]')),
      10000
    );

    // Click the heart icon next to Galaxy S20+
    const favIcon = await driver.findElement(
      By.xpath(
        '//p[text()="Galaxy S20+"]/ancestor::div[contains(@class,"shelf-item")]/descendant::div[contains(@class,"shelf-item__heart")]'
      )
    );
    await favIcon.click();

    // Click on Favorites (heart icon in navbar)
    await driver.findElement(By.id("favorites")).click();

    // Wait and verify that Galaxy S20+ is in favorites
    await driver.wait(
      until.elementLocated(By.xpath('//p[text()="Galaxy S20+"]')),
      10000
    );
  });
});
