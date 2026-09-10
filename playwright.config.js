const { defineConfig } = require("@playwright/test");
module.exports = defineConfig({
  testDir: "./tests",
  testMatch: "ui.spec.js",
  fullyParallel: false,
  use: {
    baseURL: "http://127.0.0.1:4174",
    headless: true,
    channel: "msedge",
    viewport: { width: 1440, height: 1000 },
  },
  webServer: {
    command: "node server.js",
    env: { PORT: "4174" },
    url: "http://127.0.0.1:4174",
    reuseExistingServer: false,
  },
  reporter: "list",
});
