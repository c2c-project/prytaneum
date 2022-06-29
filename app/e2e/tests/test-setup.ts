import { chromium } from '@playwright/test';
import type { Page } from '@playwright/test';

async function addEvent(page: Page, eventDate: Date) {
    const today = new Date();
    const eventText = today.toLocaleDateString() === eventDate.toLocaleDateString() ? 'Active Test' : 'Upcoming Test';

    // Set Event Details
    await page.locator('text=New Event').click();
    await page.locator('text=Title *Title * >> input[type="text"]').fill(`${eventText} Event`);
    await page.locator('text=Topic *Topic * >> input[type="text"]').fill(`${eventText} Topic`);
    await page.locator('text=Description *Description * >> input[type="text"]').fill(`${eventText} Description`);

    // Today's Date is stored in variables to make the Start and End Date/Time selectors more readable
    const todayMonth = today.toLocaleDateString('en-US', { month: 'short' });
    const todayDate = today.toLocaleDateString('en-US', { day: '2-digit' });
    const todayYear = today.getFullYear();

    // Set Start Date/Time
    await page
        .locator(
            `text=Start Date & Time *Start Date & Time * >> [aria-label="Choose date\\, selected date is ${todayMonth} ${todayDate}\\, ${todayYear}"]`
        )
        .click();
    await page.locator('[aria-label="calendar view is open\\, go to text input view"]').click();
    await page
        .locator('[placeholder="mm\\/dd\\/yyyy hh\\:mm \\(a\\|p\\)m"]')
        .fill(`${eventDate.toLocaleDateString()} 12:00 am`);
    await page.locator('text=OK').click();

    // Set End Date/Time
    await page
        .locator(
            `text=End Date & Time *End Date & Time * >> [aria-label="Choose date\\, selected date is ${todayMonth} ${todayDate}\\, ${todayYear}"]`
        )
        .click();
    await page.locator('[aria-label="calendar view is open\\, go to text input view"]').click();
    await page
        .locator('[placeholder="mm\\/dd\\/yyyy hh\\:mm \\(a\\|p\\)m"]')
        .fill(`${eventDate.toLocaleDateString()} 11:59 pm`);
    await page.locator('text=OK').click();
    await page.locator('button:has-text("Create")').click();
}

async function globalSetup() {
    const browser = await chromium.launch({
        headless: false,
    });
    const context = await browser.newContext();
    // Open new page
    const page = await context.newPage();
    await page.goto('http://localhost:8080/login');

    // Login
    await page.locator('input[type="email"]').fill('test@prytaneum.io');
    await page.locator('input[type="password"]').fill('password');
    await page.locator('text=LoginOr, register an account >> button').click();
    await Promise.all([page.waitForNavigation({ url: 'http://localhost:8080/organizations/me' })]);

    // Add Organization
    await page.locator('[data-testid="AddIcon"]').click();
    await page.locator('input[type="text"]').fill('Test Org');
    await page.locator('button:has-text("Create")').click();
    await Promise.all([
        await page.locator('div[role="button"]:has-text("Test Org")').click(),
        await page.waitForNavigation(),
    ]);

    // Add Current Event
    const today = new Date();
    await addEvent(page, today);

    // Add Upcoming Event
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await addEvent(page, tomorrow);

    // Save signed-in state to 'storageState.json'
    await page.context().storageState({ path: 'storageState.json' });
    await browser.close();
}

export default globalSetup;
