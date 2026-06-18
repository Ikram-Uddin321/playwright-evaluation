import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
    private readonly page: Page;
    private readonly pimMenu: Locator;

    constructor(page: Page) {
        this.page = page;

        this.pimMenu =
            page.locator('//span[text()="PIM"]');
    }

    public async clickPIM(): Promise<void> {

        await expect(this.pimMenu)
            .toBeVisible();

        await this.pimMenu.click();

        await this.page.waitForURL(
            '**/pim/**',
            {
                timeout: 30000
            }
        );
    }

    public async getUrl(): Promise<string> {
        return this.page.url();
    }
}