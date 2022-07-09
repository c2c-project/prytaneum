import { test, expect } from '@playwright/test';
import { PlaywrightLandingPage } from '@local/common/pages/playwright-landing-page';

test.describe('landing page login button', () => {
    test.use({ storageState: undefined });

    test('app bar login form modal closes with escape', async ({ page }) => {
        const landing = new PlaywrightLandingPage(page);
        await landing.goto();
        await landing.clickOnLogin();
        await landing.see(landing.LoginFormModal);
        await landing.presEscape();
        await landing.doNotSee(landing.LoginFormModal);
    });

    test('app bar login form works', async ({ page }) => {
        const landing = new PlaywrightLandingPage(page);
        await landing.goto();
        await landing.clickOnLogin();
        await landing.fillInEmail('test@example.com');
        await landing.fillInPassword('Password1!');
        await landing.submitLoginForm();
        await landing.amLoggedIn();
    });
});
