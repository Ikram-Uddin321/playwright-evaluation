import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { EmployeeListPage } from '../pages/EmployeeListPage';

test('Search Employee and Validate Rows', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const employeeListPage = new EmployeeListPage(page);

    await loginPage.navigate();
    await loginPage.login('Admin', 'admin123');

    await dashboardPage.clickPIM();

    await employeeListPage.searchEmployee('a');

    const rowCount = await employeeListPage.getRowCount();

    console.log('Row Count:', rowCount);

    expect(rowCount).toBeGreaterThan(0);

    const names = await employeeListPage.getEmployeeNames();

    expect(names.length).toBeGreaterThan(0);

    for (const n of names) {
        expect(n.trim()).not.toBe('');
    }
});