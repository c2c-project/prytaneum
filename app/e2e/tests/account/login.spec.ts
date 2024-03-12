import { test } from '@playwright/test';
import { PlaywrightLandingPage } from '@local/common/pages/playwright-login-page';

test.describe('login page', () => {
    test.describe.configure({ mode: 'parallel' });
    test('login page should display login form', async ({ page }) => {
        // arrange
        const login = new PlaywrightLandingPage(page);
        // act
        await login.goto();
        // assert
        await login.amOnLoginPage();
        await login.see(login.loginIllustation);
        await login.see(login.emailInput);
        await login.see(login.passwordInput);
        await login.see(login.loginButton);
        await login.see(login.forgotPasswordLink);
        await login.see(login.registerAccountLink);
    });
    test('An error displays when logging in with incorrect credentials', async ({ page }) => {
        // arrange
        const login = new PlaywrightLandingPage(page);
        // act
        await login.goto();
        await login.fillInEmail('test@test.com');
        await login.fillInPassword('testPassword');
        await login.submitLoginForm();
        // assert
        await login.see(login.failedSnack);
    });
    test('Logs in successfully with correct credentials', async ({ page }) => {
        // arrange
        const login = new PlaywrightLandingPage(page);
        // act
        await login.goto();
        await login.fillInEmail('user1@example.com');
        await login.fillInPassword('Password1!');
        await login.submitLoginForm();
        // assert
        await login.amLoggedIn();
    });
    test('I can click on the forgot password link', async ({ page }) => {
        // arrange
        const login = new PlaywrightLandingPage(page);
        // act
        await login.goto();
        await login.clickOnForgotPassword();
        // assert
        await login.amOnForgotPasswordPage();
    });
    test('I can click on the register account link', async ({ page }) => {
        // arrange
        const login = new PlaywrightLandingPage(page);
        // act
        await login.goto();
        await login.clickOnRegisterAccount();
        // assert
        await login.amOnRegisterPage();
    });
});
