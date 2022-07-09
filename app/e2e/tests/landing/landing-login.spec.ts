import { test, expect } from '@playwright/test';
import { PlaywrightLandingPage } from '@local/common/pages/playwright-landing-page';

test.describe('landing page login button', () => {
    test.use({ storageState: undefined });

    test('I can close the login modal if I accidentally open it', async ({ page }) => {
        const landing = new PlaywrightLandingPage(page);
        await landing.goto();
        await landing.clickOnLogin();
        await landing.see(landing.loginFormModal);
        await landing.presEscape();
        await landing.doNotSee(landing.loginFormModal);
    });

    test('I can login from the app bar', async ({ page }) => {
        const landing = new PlaywrightLandingPage(page);
        await landing.goto();
        await landing.clickOnLogin();
        await landing.fillInEmail('test@example.com');
        await landing.fillInPassword('Password1!');
        await landing.submitLoginForm();
        await landing.amLoggedIn();
    });
});
