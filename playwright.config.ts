import { defineConfig, devices } from "@playwright/test";

require("dotenv").config();

export default defineConfig({
  forbidOnly: !!process.env.CI,

  timeout: 150000,

  expect: {
    timeout: 5000,
  },

  retries: 0,

  workers: 1,

  reporter: "html",
  use: {
    baseURL: "https://www.linkedin.com/",
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
