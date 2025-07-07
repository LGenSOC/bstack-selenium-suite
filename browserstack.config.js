require("dotenv").config();

module.exports = {
  commonCapabilities: {
    "browserstack.user": process.env.BROWSERSTACK_USERNAME,
    "browserstack.key": process.env.BROWSERSTACK_ACCESS_KEY,
    build: "BSTACK Tech Challenge",
    name: "Tech Challenge Test",
  },
  capabilities: [
    {
      os: "Windows",
      os_version: "10",
      browserName: "Chrome",
    },
    {
      os: "OS X",
      os_version: "Ventura",
      browserName: "Firefox",
    },
    {
      device: "Samsung Galaxy S22",
      realMobile: "true",
      browserName: "Chrome",
    },
  ],
};
