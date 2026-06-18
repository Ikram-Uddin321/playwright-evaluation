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
    await this.pimMenu.click();
    await this.page.waitForURL('**/pim/**');
    await this.page.waitForLoadState('networkidle');
}
}   