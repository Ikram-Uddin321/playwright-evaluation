import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Successful Login', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login('Admin', 'admin123');

    await expect(page).toHaveURL(/dashboard/);
});

test('Failed Login', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login('Admin', 'wrongPassword');

    const errorMessage = await loginPage.getErrorMessage();

    console.log('ERROR MESSAGE:', errorMessage);

    expect(errorMessage?.toLowerCase().trim())
        .toContain('invalid credentials');
}); 