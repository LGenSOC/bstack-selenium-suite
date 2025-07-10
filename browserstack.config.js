require("dotenv").config();

const commonCapabilities = {
  "browserstack.user": process.env.BROWSERSTACK_USERNAME,
  "browserstack.key": process.env.BROWSERSTACK_ACCESS_KEY,
  build: "BSTACK Tech Challenge",
  name: "Tech Challenge Test",
  "browserstack.debug": true,
  "browserstack.networkLogs": true,
};

const capabilities = [];

if (process.env.DEVICE) {
  // Real mobile device config
  capabilities.push({
    ...commonCapabilities,
    device: process.env.DEVICE,
    realMobile: "true",
    browserName: process.env.BROWSER || "Chrome",
    os_version: process.env.OS_VERSION || "12.0",
  });
} else {
  // Desktop browser config
  capabilities.push({
    ...commonCapabilities,
    os: process.env.OS,
    os_version: process.env.OS_VERSION,
    browserName: process.env.BROWSER,
  });
}

module.exports = {
  capabilities,
};
