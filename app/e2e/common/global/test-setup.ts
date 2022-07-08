import { chromium } from '@playwright/test';
import { PlaywrightLandingPage } from '@local/common/pages/playwright-landing-page';

async function globalSetup() {
    // Setup Context
    const browser = await chromium.launch();
    const context = await browser.newContext({ baseURL: 'http://localhost:8080' });
    // Open new page
    const page = await context.newPage();
    const landingPage = new PlaywrightLandingPage(page);
    await landingPage.goto();
    // Create Account
    await landingPage.appBarRegister({
        email: `test@example.com`,
        password: 'Password1!',
        firstName: 'First',
        lastName: 'Last',
    });
    // Save signed-in state to 'storageState.json'
    await page.context().storageState({ path: 'storageState.json' });
    await browser.close();
}

export default globalSetup;
