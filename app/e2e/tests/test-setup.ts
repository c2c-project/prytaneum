import { chromium } from '@playwright/test';
import { loginWithPassword } from '../common/interactions/loginWithPassword';

async function globalSetup() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // Login
    await loginWithPassword(page, 'test@prytaneum.io', 'password');

    // Save signed-in state to 'storageState.json'
    await page.context().storageState({ path: 'storageState.json' });
    await browser.close();
}

export default globalSetup;
