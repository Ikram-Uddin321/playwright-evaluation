import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  timeout: 60000,

  retries: 1,

  reporter: 'html',

  use: {
    headless: true,

    screenshot: 'only-on-failure',

    trace: 'retain-on-failure',

    video: 'retain-on-failure',

    actionTimeout: 15000,

    navigationTimeout: 60000
  }
});