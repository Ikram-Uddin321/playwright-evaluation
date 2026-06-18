import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Successful Login', async ({ page }) => {

    const loginPage: LoginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
        'Admin',
        'admin123'
    );

    await expect(page).toHaveURL(/dashboard/);
});

test('Failed Login', async ({ page }) => {

    const loginPage: LoginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
        'Admin',
        'wrongPassword'
    );

    const errorMessage: string =
        await loginPage.getErrorMessage();

    expect(errorMessage)
        .toContain('Invalid credentials');
});