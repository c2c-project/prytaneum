import { chromium } from '@playwright/test';
import type { Page } from '@playwright/test';

async function login(page: Page) {
    await page.locator('input[type="email"]').fill('test@prytaneum.io');
    await page.locator('input[type="password"]').fill('password');
    await page.locator('text=LoginOr, register an account >> button').click();
    await page.waitForURL('http://localhost:8080/organizations/me');
}

async function deleteOrg(page: Page) {
    await page.locator('button').first().click();
    await page.locator('div[role="button"]:has-text("My Organizations")').click();
    await page.waitForURL('http://localhost:8080/organizations/me');
    await page.locator('[aria-label="delete organization"]').click();
    await page.locator('text=Confirm').click();
}

async function deleteEvent(page: Page, eventDate: Date) {
    const today = new Date();
    const eventText =
        today.toLocaleDateString() === eventDate.toLocaleDateString() ? 'Active Test Event' : 'Upcoming Test Event';

    // Date is stored in separate variables to make the eventButton selector more readable
    const month = eventDate.toLocaleDateString('en-US', { month: '2-digit' });
    const day = eventDate.toLocaleDateString('en-US', { day: '2-digit' });
    const year = eventDate.getFullYear();
    const eventButton = `div[role="button"]:has-text("${eventText}${month}/${day}/${year}")`;

    page.locator(eventButton).click();
    await page.locator(`[aria-label="Enter ${eventText} to delete event"]`).fill(eventText);
    await page.locator(`[aria-label="Enter ${eventText} again"]`).fill(eventText);
    await page.locator('button:has-text("Delete Event")').click();
}

async function globalTeardown() {
    // Setup Context
    const browser = await chromium.launch({
        headless: false,
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://localhost:8080/login');

    // Login
    login(page);

    // Remove Active Event
    await page.locator('div[role="button"]:has-text("Test Org")').click();
    const today = new Date();
    await deleteEvent(page, today);

    // Remove Upcoming Event
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    await deleteEvent(page, tomorrow);

    // Remove Organization
    await deleteOrg(page);

    // Cleanup
    await context.close();
    await browser.close();
}

export default globalTeardown;
