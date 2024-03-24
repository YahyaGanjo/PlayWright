import { defineConfig, devices } from "@playwright/test";

require("dotenv").config();

export default defineConfig({
  forbidOnly: !!process.env.CI,

  retries: 1,

  workers: process.env.CI ? 1 : undefined,

  reporter: "html",
  use: {
    baseURL: "https://www.volkskrant.nl/",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: devices["Desktop Chrome"],
    },
    {
      name: "firefox",
      use: devices["Desktop Firefox"],
    },
    {
      name: "webkit",
      use: devices["Desktop Safari"],
    },
  ],
});
