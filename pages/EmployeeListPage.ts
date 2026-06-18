import { Page, Locator } from '@playwright/test';

export class EmployeeListPage {
    private readonly page: Page;
    private readonly employeeNameField: Locator;
    private readonly searchButton: Locator;
    private readonly tableRows: Locator;

    constructor(page: Page) {
        this.page = page;

        this.employeeNameField =
            page.locator('input[placeholder="Type for hints..."]').first();

        this.searchButton =
            page.locator('button[type="submit"]');

        this.tableRows =
            page.locator('.oxd-table-body .oxd-table-row');
    }

    public async searchEmployee(employeeName: string): Promise<void> {
        await this.employeeNameField.click();

        await this.employeeNameField.clear();

        await this.employeeNameField.pressSequentially(employeeName);

        await this.page.waitForTimeout(2000);

        // Select autocomplete suggestion
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');

        await this.page.waitForTimeout(1000);

        await this.searchButton.click();

        await this.page.waitForTimeout(3000);
    }

    public async getRowCount(): Promise<number> {
        const count: number = await this.tableRows.count();

        console.log(`Row Count: ${count}`);

        return count;
    }

    public async getEmployeeNames(): Promise<string[]> {
        const names: string[] = [];

        const count: number = await this.tableRows.count();

        for (let i: number = 0; i < count; i++) {
            const name: string =
                (
                    await this.tableRows
                        .nth(i)
                        .locator('div[role="cell"]')
                        .nth(2)
                        .textContent()
                )?.trim() || '';

            names.push(name);
        }

        console.log('Employee Names:', names);

        return names;
    }
}