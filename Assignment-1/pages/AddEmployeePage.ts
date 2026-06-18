import { Page } from '@playwright/test';

export class AddEmployeePage {

    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async navigateToAddEmployee(): Promise<void> {
        await this.page.click('a[href*="addEmployee"]');
    }
}