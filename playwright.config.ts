import { defineConfig, devices } from "@playwright/test";

require("dotenv").config();

export default defineConfig({
  forbidOnly: !!process.env.CI,

  retries: 1,

  workers: 3,

  reporter: "html",
  use: {
    baseURL: "https://www.volkskrant.nl/",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "Firefox",
      use: devices["Desktop Firefox"],
    },
    {
      name: "chromium",
      use: devices["Desktop Chrome"],
    },
    {
      name: "webkit",
      use: devices["Desktop Safari"],
    },
  ],
});
