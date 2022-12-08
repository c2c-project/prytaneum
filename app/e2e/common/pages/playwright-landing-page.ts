// playwright-landing-page.ts
import { expect, Locator, Page } from '@playwright/test';
export class PlaywrightLandingPage {
    readonly page: Page;
    // Buttons
    readonly appBarHamburgerButton: Locator;
    readonly appBarRegisterButton: Locator;
    readonly appBarLoginButton: Locator;
    readonly largeRegisterButton: Locator;
    // Logos/Graphics
    readonly appBarPrytaneumLogo: Locator;
    readonly prytanumTextLogo: Locator;
    readonly prytaneumLogoSubheader: Locator;
    readonly landingGraphic: Locator;
    readonly bottomPrytaneumLogo: Locator;
    readonly democracyFundLogo: Locator;
    readonly UCRTecdLogo: Locator;
    // Modals
    readonly loginFormModal: Locator;
    readonly registerFormModal: Locator;

    constructor(page: Page) {
        this.page = page;

        this.appBarHamburgerButton = page.locator('header button').first();
        this.appBarRegisterButton = page.locator('[data-test-id="appbar-register-button"]');
        this.appBarLoginButton = page.locator('[data-test-id="appbar-login-button"]');
        this.largeRegisterButton = page.locator('[data-test-id="large-register-button"]');

        this.prytanumTextLogo = page.locator('[data-test-id="landing-prytanum-logo"]');
        this.prytaneumLogoSubheader = page.locator('text=A crucial tool for a better democracy.');
        this.landingGraphic = page.locator('img[alt="Prytaneum Landing Graphic"]');
        this.appBarPrytaneumLogo = page.locator('[data-test-id="prytaneum-title-logo"]');
        this.bottomPrytaneumLogo = page.locator('img[alt="prytaneum logo"]');
        this.democracyFundLogo = page.locator('img[alt="democracy fund logo"]');
        this.UCRTecdLogo = page.locator('img[alt="ucr tecd logo"]');

        this.loginFormModal = page.locator('[data-test-id="login-form"]');
        this.registerFormModal = page.locator('[data-test-id="register-form"]');
    }
    // Dynamic Locators
    async locateSideNavText(text: string) {
        return this.page.locator(`div[role="button"]:has-text("${text}")`);
    }
    // Actions
    async goto() {
        await this.page.goto('/');
    }

    async clickOnLogin() {
        await this.appBarLoginButton.click();
    }

    async clickOnRegister() {
        await this.appBarRegisterButton.click();
    }

    async openSideNav() {
        await this.appBarHamburgerButton.click();
    }

    async presEscape() {
        this.page.keyboard.press('Escape');
    }

    async fillInFirstName(firstName: string) {
        const firstNameInput = this.page.getByLabel('First Name *');
        await expect(firstNameInput).toBeVisible();
        await firstNameInput.click();
        await firstNameInput.fill(firstName);
    }

    async fillInLastName(lastName: string) {
        const lastNameInput = this.page.getByLabel('Last Name *');
        await expect(lastNameInput).toBeVisible();
        await lastNameInput.click();
        await lastNameInput.fill(lastName);
    }

    async fillInEmail(email: string) {
        const emailInput = this.page.getByLabel('Email *');
        await expect(emailInput).toBeVisible();
        await emailInput.fill(email);
    }

    async fillInLoginPassword(password: string) {
        const passwordInput = this.page.getByLabel('Password *');
        await expect(passwordInput).toBeVisible();
        await passwordInput.fill(password);
    }

    async fillInRegisterPassword(password: string) {
        const passwordInput = this.page.locator('[data-test-id="register-password"]').getByLabel('Password *');
        await expect(passwordInput).toBeVisible();
        await passwordInput.fill(password);
    }

    async fillInRegisterConfirmPassword(password: string) {
        const confirmPasswordInput = this.page.getByLabel('Confirm Password *');
        await expect(confirmPasswordInput).toBeVisible();
        await confirmPasswordInput.fill(password);
    }

    async submitLoginForm() {
        const loginButton = this.page.getByRole('button', { name: 'Login' });
        await expect(loginButton).toBeVisible();
        await loginButton.click();
        await this.page.waitForNavigation();
    }

    async submitRegisterForm() {
        const registerButton = this.page.getByRole('button', { name: 'Register' });
        await expect(registerButton).toBeVisible();
        await registerButton.click();
        await this.page.waitForNavigation();
    }

    async clickOnLargeRegisterButton() {
        await expect(this.largeRegisterButton).toBeVisible();
        await this.largeRegisterButton.click();
        await this.page.waitForNavigation();
    }
    // Route Checks
    async amLoggedIn() {
        await expect(this.page).toHaveURL('/organizations/me');
    }

    async amOnRegistrationPage() {
        await expect(this.page).toHaveURL('/register');
    }
    // Helpers
    async see(component: Locator) {
        await expect(component).toBeVisible();
    }

    async doNotSee(component: Locator) {
        await expect(component).toBeHidden();
    }
}
