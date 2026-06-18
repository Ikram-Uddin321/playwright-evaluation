import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { EmployeeListPage } from '../pages/EmployeeListPage';

test('Search Employee and Validate Rows', async ({ page }) => {

    test.setTimeout(60000);

    const loginPage: LoginPage = new LoginPage(page);
    const dashboardPage: DashboardPage = new DashboardPage(page);
    const employeeListPage: EmployeeListPage =
        new EmployeeListPage(page);

    await loginPage.navigate();

    await loginPage.login(
        'Admin',
        'admin123'
    );

    await dashboardPage.clickPIM();

    await employeeListPage.searchEmployee('Ravi M B');

    const rowCount: number =
        await employeeListPage.getRowCount();

    expect(rowCount).toBeGreaterThan(0);

    const employeeNames: string[] =
        await employeeListPage.getEmployeeNames();

    expect(employeeNames.length)
        .toBeGreaterThan(0);

    for (const name of employeeNames) {
        expect(name.trim()).not.toBe('');
    }
});