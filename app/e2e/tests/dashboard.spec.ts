import { test, expect } from '@playwright/test';

test('Dashboard has button to create event.', async ({ page }) => {
    // Go to Dashboard
    await page.goto('/dashboard');

    // Click Create Event button
    await page.locator('[aria-label="view future event"]').click();
    await expect(page).toHaveURL('/organizations/me');
});

test('Dashboard has sections for Current Events and Upcoming Events.', async ({ page }) => {
    // Go to Dashboard
    await page.goto('/dashboard');

    // Check that Current Events div and text are present
    await expect(page.locator('text=Current Events')).toHaveCount(1);

    // Check that Current Events div and text are present
    await expect(page.locator('text=Upcoming Events')).toHaveCount(1);
});

test('Dashboard has link to live feed for Current Events.', async ({ page }) => {
    // Go to Dashboard
    await page.goto('/dashboard');

    // Select Live Feed
    await Promise.all([
        page.locator('[aria-label="view live feed of current event"]').click(),
        page.waitForNavigation(/*{ url: 'http://localhost:8080/events/RXZlbnQ6N2JmZWFmNmItMGJiMi00NTAxLWJjMDYtNWM1ZjFlYWQyZTA1/live'}*/)
        
    ])
    await expect(page).toHaveURL('/events/RXZlbnQ6N2JmZWFmNmItMGJiMi00NTAxLWJjMDYtNWM1ZjFlYWQyZTA1/live');
});

test('Dashboard takes user to Event Settings when selecting a Current Event.', async ({ page }) => {
    // Go to Dashboard
    await page.goto('/dashboard');

    // Click on Current Event
    await page.locator('text=Test 106/21/2022Wessels TestLive Feed').click();
    await expect(page).toHaveURL('/events/RXZlbnQ6N2JmZWFmNmItMGJiMi00NTAxLWJjMDYtNWM1ZjFlYWQyZTA1/settings');
});

test('Dashboard takes user to Event Settings when selecting an Upcoming Event.', async ({ page }) => {
    // Go to Dashboard
    await page.goto('/dashboard');

    // Click on Upcoming Event
    await page.locator('div[role="button"]:has-text("Test 206/25/2022Wessels Test")').click();
    await expect(page).toHaveURL('/events/RXZlbnQ6NjMxNGYxNjUtZmMyYS00ZjkxLWE3ODItZjk1M2Q1M2E3OTIw/settings');
});

test('User is directed back to Dashboard on refresh.', async ({ page }) => {
    // Go to Dashboard
    await page.goto('/dashboard');

    // Refresh the Page
    await page.reload();
    await expect(page).toHaveURL('/dashboard');
});

test('User is directed to landing page if not logged in.', async ({ browser }) => {
    // Use context without authentication
    const context = await browser.newContext();
    await context.clearCookies();
    const page = await context.newPage();

    // Attempt to navigate to Dashboard
    await Promise.all([
        page.waitForNavigation(),
        page.goto('/dashboard'),
    ]);

    await expect(page).toHaveURL('/');
});