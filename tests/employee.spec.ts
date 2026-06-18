import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { EmployeeListPage } from '../pages/EmployeeListPage';

test('Search Employee and Validate Rows', async ({ page }) => {

    test.setTimeout(60000);

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const employeeListPage = new EmployeeListPage(page);

    // Navigate to Login Page
    await loginPage.navigate();

    // Login
    await loginPage.login(
        'Admin',
        'admin123'
    );

    // Navigate to PIM
    await dashboardPage.clickPIM();

    // Search Existing Employee
    await employeeListPage.searchEmployee(
        'Baba Dook'
    );

    // Validate Row Count
    const rowCount =
        await employeeListPage.getRowCount();

    console.log(
        `Row Count After Search: ${rowCount}`
    );

    expect(rowCount).toBeGreaterThan(0);

    // Validate Employee Names
    const employeeNames =
        await employeeListPage.getEmployeeNames();

    expect(employeeNames.length)
        .toBeGreaterThan(0);

    for (const name of employeeNames) {
        expect(name.trim()).not.toBe('');
    }

    console.log(
        'Employee Names:',
        employeeNames
    );
});