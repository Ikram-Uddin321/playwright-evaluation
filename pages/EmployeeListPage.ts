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

    await this.employeeNameField.waitFor({ state: 'visible' });

    await this.employeeNameField.fill(employeeName);

    await this.searchButton.click();

    // ✅ WAIT FOR TABLE UPDATE (MOST IMPORTANT FIX)
    await this.page.waitForTimeout(3000);
}


  public async getRowCount(): Promise<number> {

    // ensure table is loaded
    await this.tableRows.first().waitFor({ state: 'visible' });

    const count = await this.tableRows.count();

    console.log('Row Count:', count);

    return count;
}

    public async getEmployeeNames(): Promise<string[]> {

        const names: string[] = [];
        const count = await this.tableRows.count();

        for (let i = 0; i < count; i++) {

            const text =
                await this.tableRows
                    .nth(i)
                    .locator('div[role="cell"]')
                    .nth(2)
                    .textContent();

            names.push(text?.trim() || '');
        }

        return names;
    }
}