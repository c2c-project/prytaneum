import { expect, Locator, Page } from '@playwright/test';

export class PlaywrightRegisterPage {
    readonly page: Page;
    // Buttons
    readonly registerButton: Locator;
    // Register Form
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly loginLink: Locator;
    // Snacks
    readonly failedSnackMismatcedPasswords: Locator;
    readonly failedSnackPasswordSpecialCharacter: Locator;
    readonly failedSnackPasswordMissingNumber: Locator;
    readonly failedSnackPasswordUpperCase: Locator;
    readonly failedSnackPasswordLowerCase: Locator;
    readonly failedSnackPasswordLength: Locator;
    readonly failedSnackInternalError: Locator;
    // Logos/Graphics
    readonly registerIllustration: Locator;

    constructor(page: Page) {
        this.page = page;
        // Buttons
        this.registerButton = page.locator('[data-test-id="register-form-submit"]');
        // Register Form
        this.firstNameInput = page.getByLabel('First Name *');
        this.lastNameInput = page.getByLabel('Last Name *');
        this.emailInput = page.getByLabel('Email *');
        this.passwordInput = page.locator('[data-test-id="register-password"]').getByLabel('Password *');
        this.confirmPasswordInput = page.getByLabel('Confirm Password *');
        this.loginLink = page.getByRole('link', { name: 'Already have an account?' });
        // Snacks
        this.failedSnackMismatcedPasswords = page.getByText('Passwords must match.');
        this.failedSnackPasswordSpecialCharacter = page.getByText(
            'Password missing required complexity: special character.'
        );
        this.failedSnackPasswordMissingNumber = page.getByText(
            'Password missing required complexity: number character.'
        );
        this.failedSnackPasswordUpperCase = page.getByText(
            'Password missing required complexity: upper case character.'
        );
        this.failedSnackPasswordLowerCase = page.getByText(
            'Password missing required complexity: lower case character.'
        );
        this.failedSnackPasswordLength = page.getByText('New passwords must be at least 8 characters.');
        this.failedSnackInternalError = page.getByText(
            'A link to activate your account has been emailed to the address provided.'
        );
        // Logos/Graphics
        this.registerIllustration = page.getByRole('img', { name: 'Register Illustration' });
    }

    async goto() {
        await this.page.goto('/register');
    }

    // Form Actions
    async fillInFirstName(firstName: string) {
        await this.firstNameInput.click();
        await this.firstNameInput.fill(firstName);
    }

    async fillInLastName(lastName: string) {
        await this.lastNameInput.click();
        await this.lastNameInput.fill(lastName);
    }

    async fillInEmail(email: string) {
        await this.emailInput.click();
        await this.emailInput.fill(email);
    }

    async fillInPassword(password: string) {
        await this.passwordInput.click();
        await this.passwordInput.fill(password);
    }

    async fillInConfirmPassword(password: string) {
        await this.confirmPasswordInput.click();
        await this.confirmPasswordInput.fill(password);
    }

    async submitRegisterForm() {
        await this.registerButton.click();
    }

    async clickOnLoginLink() {
        await this.loginLink.click();
    }

    // Route Checks
    async amOnRegisterPage() {
        await this.page.waitForURL('/register');
    }

    async amOnLoginPage() {
        await this.page.waitForURL('/login');
    }

    async amRegistered() {
        await this.page.waitForURL('/organizations/me');
    }

    // Helpers
    async see(component: Locator) {
        await expect(component).toBeVisible();
    }

    async doNotSee(component: Locator) {
        await expect(component).toBeHidden();
    }
}
