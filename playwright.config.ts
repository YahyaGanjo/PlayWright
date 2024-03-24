import { defineConfig, devices } from '@playwright/test';

require('dotenv').config();

export default defineConfig({

  forbidOnly: !!process.env.CI,

  retries: 2,

  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [

    {
      name: 'chromium',
      use: { 
        baseURL: 'https://www.volkskrant.nl/',
         ...devices['Desktop Chrome']
      },
    },
  ]
});
