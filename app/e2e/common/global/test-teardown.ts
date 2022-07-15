import { chromium } from '@playwright/test';
import { PlaywrightLandingPage } from '@local/common/pages';
import { getOrganizersByDeviceAmmount, getUsersByDeviceAmmount } from '../utils/accounts';

async function globalTeardown() {
    console.log('Running Global Teardown...');
    // const browser = await chromium.launch();

    // const users = getUsersByDeviceAmmount();
    // const organizers = getOrganizersByDeviceAmmount();

    // // Delete all users
    // for (let i = 0; i < users.length; i++) {
    //     // Setup Context
    //     const context = await browser.newContext({ baseURL: process.env.BASE_URL || 'http://localhost:8080' });
    //     // Open new page
    //     const page = await context.newPage();
    //     const landing = new PlaywrightLandingPage(page);
    //     await landing.goto();
    //     await landing.clickOnLogin();
    //     await landing.fillInEmail(`${users[i]}@example.com`);
    //     await landing.fillInPassword('Password1!');
    //     await landing.submitLoginForm();
    //     // Delete Account
    //     // TODO update once methods exist for these actions
    //     await page.locator('[data-test-id="appbar-user-menu"]').click();
    //     await Promise.all([
    //         page.waitForNavigation(/*{ url: '/settings' }*/),
    //         page.locator('li[role="menuitem"]:has-text("Settings")').click(),
    //     ]);
    //     await page.locator('[aria-label="Enter your password"]').click();
    //     await page.locator('[aria-label="Enter your password"]').fill('Password1!');
    //     await page.locator('[aria-label="Enter your password again"]').click();
    //     await page.locator('[aria-label="Enter your password again"]').fill('Password1!');
    //     await Promise.all([
    //         page.waitForNavigation(/*{ url: '/organizations/me' }*/),
    //         page.locator('button:has-text("Delete account")').click(),
    //     ]);
    //     await page.goto('http://localhost:8080/');
    //     // Cleanup
    //     await page.close();
    //     await context.close();
    // }

    // // Delete all organizers
    // for (let i = 0; i < users.length; i++) {
    //     // Setup Context
    //     const context = await browser.newContext({ baseURL: process.env.BASE_URL || 'http://localhost:8080' });
    //     // Open new page
    //     const page = await context.newPage();
    //     const landing = new PlaywrightLandingPage(page);
    //     await landing.goto();
    //     await landing.clickOnLogin();
    //     await landing.fillInEmail(`${organizers[i]}@example.com`);
    //     await landing.fillInPassword('Password1!');
    //     await landing.submitLoginForm();
    //     // Delete Account
    //     // TODO update once methods exist for these actions
    //     await page.locator('[data-test-id="appbar-user-menu"]').click();
    //     await Promise.all([
    //         page.waitForNavigation(/*{ url: '/settings' }*/),
    //         page.locator('li[role="menuitem"]:has-text("Settings")').click(),
    //     ]);
    //     await page.locator('[aria-label="Enter your password"]').click();
    //     await page.locator('[aria-label="Enter your password"]').fill('Password1!');
    //     await page.locator('[aria-label="Enter your password again"]').click();
    //     await page.locator('[aria-label="Enter your password again"]').fill('Password1!');
    //     await Promise.all([
    //         page.waitForNavigation(/*{ url: '/organizations/me' }*/),
    //         page.locator('button:has-text("Delete account")').click(),
    //     ]);
    //     await page.goto('http://localhost:8080/');
    //     // Cleanup
    //     await page.close();
    //     await context.close();
    // }

    // await browser.close();
    console.log('Global Teardown Complete');
}

export default globalTeardown;
