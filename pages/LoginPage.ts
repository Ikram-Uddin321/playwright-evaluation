import { Page, Locator } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;

    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.locator('button[type="submit"]');
        this.errorMessage = page.locator('.oxd-alert-content-text');
    }

    // Navigate to login page
    async navigate(): Promise<void> {
        await this.page.goto(
            'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
            {
                waitUntil: 'domcontentloaded',
                timeout: 60000
            }
        );

        await this.usernameInput.waitFor({ state: 'visible' });
    }

    // LOGIN (works for BOTH success & failed cases)
    async login(username: string, password: string): Promise<void> {

        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);

        await this.loginButton.click();
    }

    // ERROR MESSAGE (failed login only)
    async getErrorMessage(): Promise<string> {

    const errorLocator = this.page.locator(
        '.oxd-alert-content-text, .oxd-text.oxd-text--p, .oxd-alert'
    );

    await errorLocator.first().waitFor({ state: 'visible', timeout: 15000 });

    const text = await errorLocator.first().textContent();

    console.log('CAPTURED ERROR:', text);

    return text?.trim() || '';
}
}