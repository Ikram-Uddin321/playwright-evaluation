import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',

    timeout: 70000,

    retries: 1,

    reporter: 'html',

    use: {
        headless: true,

        screenshot: 'only-on-failure',

        trace: 'retain-on-failure',

        video: 'retain-on-failure',

        actionTimeout: 30000,

        navigationTimeout: 70000,

        viewport: {
            width: 1920,
            height: 1080
        }
    }
});