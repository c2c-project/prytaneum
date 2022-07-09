import { chromium } from '@playwright/test';
import { PlaywrightLandingPage } from '@local/common/pages/playwright-landing-page';

async function globalSetup() {
    // Setup Context
    const browser = await chromium.launch();
    const context = await browser.newContext({ baseURL: process.env.BASE_URL || 'http://localhost:8080' });
    // Open new page and create new user
    const page = await context.newPage();
    const landing = new PlaywrightLandingPage(page);
    await landing.goto();
    await landing.clickOnRegister();
    await landing.fillInFirstName('John');
    await landing.fillInLastName('Smith');
    await landing.fillInEmail(`test@example.com`);
    await landing.fillInPassword('Password1!');
    await landing.fillInConfirmPassword('Password1!');
    await landing.submitRegisterForm();
    // Save signed-in state to 'storageState.json'
    await page.context().storageState({ path: 'storageState.json' });
    await browser.close();
}

export default globalSetup;
