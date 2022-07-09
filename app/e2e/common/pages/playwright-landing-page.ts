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
        const firstNameInput = this.page.locator('text=First Name *First Name * >> input[type="text"]');
        await expect(firstNameInput).toBeVisible();
        await firstNameInput.click();
        await firstNameInput.fill(firstName);
    }

    async fillInLastName(lastName: string) {
        const lastNameInput = this.page.locator('text=Last Name *Last Name * >> input[type="text"]');
        await expect(lastNameInput).toBeVisible();
        await lastNameInput.click();
        await lastNameInput.fill(lastName);
    }

    async fillInEmail(email: string) {
        const emailInput = this.page.locator('input[type="email"]');
        await expect(emailInput).toBeVisible();
        await emailInput.fill(email);
    }

    async fillInPassword(password: string) {
        const passwordInput = this.page.locator('input[type="password"]').first();
        await expect(passwordInput).toBeVisible();
        await passwordInput.fill(password);
    }

    async fillInConfirmPassword(password: string) {
        const confirmPasswordInput = this.page.locator('input[type="password"]').nth(1);
        await expect(confirmPasswordInput).toBeVisible();
        await confirmPasswordInput.fill(password);
    }

    async submitLoginForm() {
        const loginButton = this.page.locator('div[role="dialog"] button:has-text("Login")');
        await expect(loginButton).toBeVisible();
        await Promise.all([this.page.waitForNavigation(), loginButton.click()]);
    }

    async submitRegisterForm() {
        const registerButton = this.page.locator('div[role="dialog"] button:has-text("Register")');
        await expect(registerButton).toBeVisible();
        await Promise.all([this.page.waitForNavigation(), registerButton.click()]);
    }

    async clickOnLargeRegisterButton() {
        await expect(this.largeRegisterButton).toBeVisible();
        await Promise.all([this.page.waitForNavigation(), this.largeRegisterButton.click()]);
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
