import { Page, Locator, expect } from '@playwright/test';

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

        // Open field
        await this.employeeNameField.click();

        // Fill properly (replaces clear + unstable typing)
        await this.employeeNameField.fill(employeeName);

        // Wait for dropdown suggestions (important for CI)
        const dropdown = this.page.locator('.oxd-autocomplete-dropdown');

        if (await dropdown.isVisible().catch(() => false)) {
            await this.page.keyboard.press('ArrowDown');
            await this.page.keyboard.press('Enter');
        }

        // Click search + wait for results
        await Promise.all([
            this.page.waitForResponse(res =>
                res.url().includes('employee') && res.status() === 200
            ).catch(() => {}),
            this.searchButton.click()
        ]);

        // Ensure table is loaded
        await this.tableRows.first().waitFor({ state: 'visible' });
    }

    public async getRowCount(): Promise<number> {

        // Ensure table exists before counting
        await this.tableRows.first().waitFor({ state: 'visible' });

        const count = await this.tableRows.count();

        console.log(`Row Count: ${count}`);

        return count;
    }

    public async getEmployeeNames(): Promise<string[]> {

        await this.tableRows.first().waitFor({ state: 'visible' });

        const names: string[] = [];
        const count = await this.tableRows.count();

        for (let i = 0; i < count; i++) {

            const name = await this.tableRows
                .nth(i)
                .locator('div[role="cell"]')
                .nth(2)
                .textContent();

            names.push(name?.trim() || '');
        }

        console.log('Employee Names:', names);

        return names;
    }
}