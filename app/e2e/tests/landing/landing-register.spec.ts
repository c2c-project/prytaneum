import { test, expect } from '@playwright/test';
import { PlaywrightLandingPage } from '@local/common/pages/playwright-landing-page';

test.describe('landing page registration buttons', () => {
    test.use({ storageState: undefined });

    test('app bar register form opens and closes', async ({ page }) => {
        const landing = new PlaywrightLandingPage(page);
        await landing.goto();
        await landing.clickOnRegister();
        await landing.see(landing.registerFormModal);
        await landing.presEscape();
        await landing.doNotSee(landing.registerFormModal);
    });

    test('app bar register form works', async ({ page }) => {
        const landing = new PlaywrightLandingPage(page);
        await landing.goto();
        await landing.clickOnRegister();
        await landing.fillInFirstName('John');
        await landing.fillInLastName('Smith');
        await landing.fillInEmail(`newuser${Math.floor(Math.random() * 10000)}@example.com`);
        await landing.fillInPassword('Password1!');
        await landing.fillInConfirmPassword('Password1!');
        await landing.submitRegisterForm();
        await landing.amLoggedIn();
    });

    test('larger register button redirects to registration page', async ({ page }) => {
        const landing = new PlaywrightLandingPage(page);
        await landing.goto();
        await landing.clickOnLargeRegisterButton();
        await landing.amOnRegistrationPage();
    });
});
