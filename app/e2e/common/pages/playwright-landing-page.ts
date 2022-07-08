// playwright-landing-page.ts
import { expect, Locator, Page } from '@playwright/test';

interface RegisterForm {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

interface LoginForm {
    email: string;
    password: string;
}

export class PlaywrightLandingPage {
    readonly page: Page;
    // Buttons
    readonly appBarHamburgerButton: Locator;
    readonly appBarRegisterButton: Locator;
    readonly appBarLoginButton: Locator;
    readonly landingButton: Locator;
    readonly nextButtons: Locator;
    readonly backButtons: Locator;
    // Logos/Graphics
    readonly appBarPrytaneumLogo: Locator;
    readonly prytanumTextLogo: Locator;
    readonly prytaneumLogoSubheader: Locator;
    readonly landingGraphic: Locator;
    readonly bottomPrytaneumLogo: Locator;
    readonly DemocracyFundLogo: Locator;
    readonly UCRTecdLogo: Locator;

    constructor(page: Page) {
        this.page = page;

        this.appBarHamburgerButton = page.locator('header button').first();
        this.appBarRegisterButton = page.locator('[data-test-id="appbar-register-button"]');
        this.appBarLoginButton = page.locator('[data-test-id="appbar-login-button"]');
        this.landingButton = page.locator('[data-test-id=landing-button]');
        this.nextButtons = page.locator('text=Next');
        this.backButtons = page.locator('text=Back');

        this.prytanumTextLogo = page.locator('[data-test-id="landing-prytanum-logo"]');
        this.prytaneumLogoSubheader = page.locator('text=A crucial tool for a better democracy.');
        this.landingGraphic = page.locator('img[alt="Prytaneum Landing Graphic"]');
        this.appBarPrytaneumLogo = page.locator('[data-test-id="prytaneum-title-logo"]');
        this.bottomPrytaneumLogo = page.locator('img[alt="prytaneum logo"]');
        this.DemocracyFundLogo = page.locator('img[alt="democracy fund logo"]');
        this.UCRTecdLogo = page.locator('img[alt="ucr tecd logo"]');
    }
    // Methods
    async goto() {
        await this.page.goto('/');
    }

    async sideNavDisplaysText(text: string) {
        await this.appBarHamburgerButton.click();
        await expect(this.page.locator(`div[role="button"]:has-text("${text}")`)).toBeVisible();
        await this.appBarHamburgerButton.press('Escape');
    }

    async sideNavHidesText(text: string) {
        await this.appBarHamburgerButton.click();
        await expect(this.page.locator(`div[role="button"]:has-text("${text}")`)).toBeHidden();
        await this.appBarHamburgerButton.press('Escape');
    }

    async appBarRegisterOpensAndCloses() {
        await this.appBarRegisterButton.click();
        await Promise.all([
            expect(this.page.locator('div[role="dialog"] div:has-text("Register")').nth(2)).toBeVisible(),
            expect(this.page.locator('text=First Name *First Name * >> input[type="text"]')).toBeVisible(),
            expect(this.page.locator('text=Last Name *Last Name * >> input[type="text"]')).toBeVisible(),
            expect(this.page.locator('input[type="email"]')).toBeVisible(),
            expect(
                this.page.locator(
                    'text=Password *Password *Passwords must be at least 8 characters >> input[type="password"]'
                )
            ).toBeVisible(),
            expect(
                this.page.locator('text=Confirm Password *Confirm Password * >> input[type="password"]')
            ).toBeVisible(),
            expect(this.page.locator('form div:has-text("Register")')).toBeVisible(),
        ]);
        await this.page.locator('form div:has-text("Register")').press('Escape');
        await Promise.all([
            expect(this.page.locator('div[role="dialog"] div:has-text("Register")').nth(2)).toBeHidden(),
            expect(this.page.locator('text=First Name *First Name * >> input[type="text"]')).toBeHidden(),
            expect(this.page.locator('text=Last Name *Last Name * >> input[type="text"]')).toBeHidden(),
            expect(this.page.locator('input[type="email"]')).toBeHidden(),
            expect(
                this.page.locator(
                    'text=Password *Password *Passwords must be at least 8 characters >> input[type="password"]'
                )
            ).toBeHidden(),
            expect(
                this.page.locator('text=Confirm Password *Confirm Password * >> input[type="password"]')
            ).toBeHidden(),
            expect(this.page.locator('form div:has-text("Register")')).toBeHidden(),
        ]);
    }

    async appBarRegister({ email, password, firstName, lastName }: RegisterForm) {
        await this.appBarRegisterButton.click();
        // Fill out registration form
        await this.page.locator('text=First Name *First Name * >> input[type="text"]').click();
        await this.page.locator('text=First Name *First Name * >> input[type="text"]').fill(firstName);
        await this.page.locator('text=Last Name *Last Name * >> input[type="text"]').click();
        await this.page.locator('text=Last Name *Last Name * >> input[type="text"]').fill(lastName);
        await this.page.locator('input[type="email"]').click();
        await this.page.locator('input[type="email"]').fill(email);
        await this.page
            .locator('text=Password *Password *Passwords must be at least 8 characters >> input[type="password"]')
            .click();
        await this.page
            .locator('text=Password *Password *Passwords must be at least 8 characters >> input[type="password"]')
            .fill(password);
        await this.page.locator('text=Confirm Password *Confirm Password * >> input[type="password"]').click();
        await this.page.locator('text=Confirm Password *Confirm Password * >> input[type="password"]').fill(password);
        // Submit registration form
        await Promise.all([
            this.page.waitForNavigation(/*{ url: '/organizations/me' }*/),
            this.page.locator('div[role="dialog"] button:has-text("Register")').click(),
        ]);
    }

    async appBarLoginOpensAndCloses() {
        await this.appBarLoginButton.click();

        await Promise.all([
            expect(this.page.locator('input[type="email"]')).toBeVisible(),
            expect(this.page.locator('input[type="password"]')).toBeVisible(),
            expect(this.page.locator('text=Forgot Password?')).toBeVisible(),
            expect(this.page.locator('form div:has-text("Login")')).toBeVisible(),
        ]);
        await this.page.locator('form div:has-text("Login")').press('Escape');
        await Promise.all([
            expect(this.page.locator('input[type="email"]')).toBeHidden(),
            expect(this.page.locator('input[type="password"]')).toBeHidden(),
            expect(this.page.locator('text=Forgot Password?')).toBeHidden(),
            expect(this.page.locator('form div:has-text("Login")')).toBeHidden(),
        ]);
    }

    async appBarLogin({ email, password }: LoginForm) {
        await this.appBarLoginButton.click();
        // Fill out login form
        await this.page.locator('input[type="email"]').fill(email);
        await this.page.locator('input[type="password"]').click();
        await this.page.locator('input[type="password"]').fill(password);
        // Submit login form
        await Promise.all([
            this.page.waitForNavigation(/*{ url: '/organizations/me' }*/),
            this.page.locator('div[role="dialog"] button:has-text("Login")').click(),
        ]);
    }
}
