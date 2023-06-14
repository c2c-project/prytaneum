import { test } from '@playwright/test';
import { PlaywrightLandingPage } from '@local/common/pages/playwright-landing-page';

test('I can close the register modal if I accidently open it', async ({ page }) => {
    const landing = new PlaywrightLandingPage(page);
    await landing.goto();
    await landing.clickOnRegister();
    await landing.see(landing.registerFormModal);
    await landing.presEscape();
    await landing.doNotSee(landing.registerFormModal);
});

test('I can register from the app bar', async ({ page }) => {
    const landing = new PlaywrightLandingPage(page);
    await landing.goto();
    await landing.clickOnRegister();
    await landing.fillInFirstName('John');
    await landing.fillInLastName('Smith');
    await landing.fillInEmail(`newuser${Math.floor(Math.random() * 10000)}@example.com`);
    await landing.fillInRegisterPassword('Password1!');
    await landing.fillInRegisterConfirmPassword('Password1!');
    await landing.submitRegisterForm();
    await landing.amLoggedIn();
});
