import { chromium } from '@playwright/test';

async function globalSetup() {
    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    // Open new page
    const page = await context.newPage();
    await page.goto('http://localhost:8080/login');

    // Login
    await page.locator('input[type="email"]').click();
    await page.locator('input[type="email"]').fill('mwess005@ucr.edu');
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill('football207');
    await page.locator('text=LoginOr, register an account >> button').click();
    await Promise.all([
        page.waitForNavigation(/*{ url: 'http://localhost:8080/organizations/me' }}*/),
    ]);

    // Save signed-in state to 'storageState.json'
    await page.context().storageState({ path: 'storageState.json' });
    await browser.close();
}

export default globalSetup;
