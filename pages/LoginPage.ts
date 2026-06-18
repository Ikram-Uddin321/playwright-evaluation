import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;

  // Define locators
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators
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
}
  // Perform login
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);  
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Get error message text
  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.textContent() ?? '';
  }
}





