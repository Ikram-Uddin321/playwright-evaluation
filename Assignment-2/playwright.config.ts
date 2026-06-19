import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['list']],   // shows each test as it runs
  use: {
    screenshot: 'only-on-failure',
    trace: 'on',
  },
});
