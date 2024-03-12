import { expect, Locator, Page } from '@playwright/test';

export class PlaywrightLandingPage {
    readonly page: Page;
    // Buttons
    readonly loginButton: Locator;
    // Login Form
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly forgotPasswordLink: Locator;
    readonly registerAccountLink: Locator;
    // Snacks
    readonly failedSnack: Locator;
    // Logos/Graphics
    readonly loginIllustation: Locator;

    constructor(page: Page) {
        this.page = page;
        // Buttons
        this.loginButton = page.locator('[data-test-id="login-form-submit"]');
        // Login Form
        this.emailInput = page.getByLabel('Email *');
        this.passwordInput = page.getByLabel('Password *');
        this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot Password?' });
        this.registerAccountLink = page.getByRole('link', { name: 'Or, register an account' });
        this.failedSnack = page.getByText('Login failed; Invalid user ID or password.');
        // Logos/Graphics
        this.loginIllustation = page.getByRole('img', { name: 'Login Illustation' });
    }

    async goto() {
        await this.page.goto('/login');
    }

    // Form Actions
    async fillInEmail(email: string) {
        await this.emailInput.click();
        await this.emailInput.fill(email);
    }

    async fillInPassword(password: string) {
        await this.passwordInput.click();
        await this.passwordInput.fill(password);
    }

    async submitLoginForm() {
        await this.loginButton.click();
    }

    async clickOnRegisterAccount() {
        await this.registerAccountLink.click();
    }

    async clickOnForgotPassword() {
        await this.forgotPasswordLink.click();
    }

    // Route Checks
    async amOnLoginPage() {
        await this.page.waitForURL('/login');
    }

    async amOnRegisterPage() {
        await this.page.waitForURL('/register');
    }

    async amOnForgotPasswordPage() {
        await this.page.waitForURL('/forgot-password');
    }

    async amLoggedIn() {
        await this.page.waitForURL('/dashboard');
    }

    // Helpers
    async see(component: Locator) {
        await expect(component).toBeVisible();
    }

    async doNotSee(component: Locator) {
        await expect(component).toBeHidden();
    }
}
