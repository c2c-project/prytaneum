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
    await page.locator('text=Live Feed').click()
    await expect(page).toHaveURL('/events/RXZlbnQ6N2JmZWFmNmItMGJiMi00NTAxLWJjMDYtNWM1ZjFlYWQyZTA1/live');
});

test('Dashboard takes user to Event Settings when selecting a Current Event.', async ({ page }) => {
    // Go to Dashboard
    await page.goto('/dashboard');

    // Click on Current Event
    page.locator('text=Test 106/13/2022Wessels TestLive Feed').click();
    await expect(page).toHaveURL('/events/RXZlbnQ6N2JmZWFmNmItMGJiMi00NTAxLWJjMDYtNWM1ZjFlYWQyZTA1/settings');
});

test('Dashboard takes user to Event Settings when selecting an Upcoming Event.', async ({ page }) => {
    // Go to Dashboard
    await page.goto('/dashboard');

    // Click on Current Event
    await page.locator('div[role="button"]:has-text("Test 206/15/2022Wessels Test")').click();
    await expect(page).toHaveURL('/events/RXZlbnQ6NjMxNGYxNjUtZmMyYS00ZjkxLWE3ODItZjk1M2Q1M2E3OTIw/settings');
});

test('User is directed back to Dashboard on refresh.', async ({ page }) => {
    // Go to Dashboard
    await page.goto('/dashboard');

    // Click on Current Event
    await page.reload();
    await expect(page).toHaveURL('/dashboard');
});

// Will fail on mobile browsers. The logout button is different across desktop and mobile browsers.
test('User is directed to landing page if not logged in -- Test for Desktop.', async ({ page }) => {
    // Go to Dashboard
    await page.goto('/dashboard');

    // Logout
    await page.locator('text=MMICHAEL WESSELS').click();
    await Promise.all([
        page.waitForNavigation(/*{ url: 'http://localhost:8080/' }*/),
        page.locator('text=Logout').click()
    ]);

    // Attempt to navigate to Dashboard
    await Promise.all([
        page.waitForNavigation(/*{ url: 'http://localhost:8080/' }*/),
        page.goto('/dashboard')
    ]);

    await expect(page).toHaveURL('/');
});

// Will fail on desktop browsers. The logout button is different across desktop and mobile browsers.
test('User is directed to landing page if not logged in -- Test for Mobile.', async ({ page }) => {
    // Go to Dashboard
    await page.goto('/dashboard');

    // Logout
    await page.locator('[data-testid="MoreVertIcon"]').click();
    await Promise.all([
        page.waitForNavigation(/*{ url: 'http://localhost:8080/' }*/),
        page.locator('text=Logout').click()
    ]);

    // Attempt to navigate to Dashboard
    await Promise.all([
        page.waitForNavigation(/*{ url: 'http://localhost:8080/' }*/),
        page.goto('/dashboard')
    ]);

    await expect(page).toHaveURL('/');
});