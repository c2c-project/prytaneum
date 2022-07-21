import { test, expect } from '@local/common/utils/fixtures';
import { PlaywrightOrganizationsPage } from '@local/common/pages';

// Create organization and events that can be used to test the dashboard
test.beforeAll(async ({ browser, device }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const organizationsPage = await new PlaywrightOrganizationsPage(page, device).create(browser);
    await organizationsPage.goto();
    await organizationsPage.clickOnCreateOrganization();
    await organizationsPage.fillInOrganizationName('Test Organization');
    await organizationsPage.submitOrganizationForm();
});

// Remove organization and events that were used to test the dashboard
test.afterAll(async ({ browser, device }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const organizationsPage = await new PlaywrightOrganizationsPage(page, device).create(browser);
    await organizationsPage.goto();
    await organizationsPage.clickDeleteOrganizationButton();
    await organizationsPage.clickConfirmDeleteOrganizationButton();
});

test('I can see an event I created in the dashboard', async ({ dashboardPageOrganizer }) => {
    await dashboardPageOrganizer.goto();
    await expect(dashboardPageOrganizer.page).toHaveURL('/dashboard');
    // await dashboardPageOrganizer.clickOnEvent('Test Event');
});

// TODO: Update these tests to use page classes + fixtures + Update test naming convention to I...

// test('Dashboard has button to create event.', async ({ page }) => {
//     // Go to Dashboard
//     await page.goto('/dashboard');

//     // Click Create Event button
//     await page.locator('[aria-label="view future event"]').click();
//     await expect(page).toHaveURL('/organizations/me');
// });

// test('Dashboard has sections for Current Events and Upcoming Events.', async ({ page }) => {
//     // Go to Dashboard
//     await page.goto('/dashboard');

//     // Check that Current Events div and text are present
//     await expect(page.locator('text=Current Events')).toHaveCount(1);

//     // Check that Upcoming Events div and text are present
//     await expect(page.locator('text=Upcoming Events')).toHaveCount(1);
// });

// test('Dashboard has link to live feed for Current Events.', async ({ page }) => {
//     // Go to Dashboard
//     await page.goto('/dashboard');

//     // Select Live Feed
//     await page.locator('[aria-label="view live feed of current event"]').click(),
//     await expect(page).toHaveURL(/.*live/);
// });

// test('Dashboard takes user to Event Settings when selecting a Current Event.', async ({ page }) => {
//     const today = new Date();

//     // Go to Dashboard
//     await page.goto('/dashboard');

//     // Click on Current Event
//     await page.locator('div[role="button"]:has-text("Active Test Event' + today.toLocaleDateString('en-US', {month: '2-digit'}) + '")').click();

//     // Verify we are directed to the event's settings page
//     await expect(page.locator('text=Event Settings')).toHaveCount(1);
//     await expect(page.locator('text=titleActive Test Event >> p')).toHaveCount(1);
//     await expect(page.locator('text=Active Test Topic')).toHaveCount(1);
//     await expect(page.locator('text=Active Test Description')).toHaveCount(1);
// });

// test('Dashboard takes user to Event Settings when selecting an Upcoming Event.', async ({ page }) => {
//     const tomorrow = new Date();
//     tomorrow.setDate(tomorrow.getDate() + 1);

//     // Go to Dashboard
//     await page.goto('/dashboard');

//     // Click on Upcoming Event
//     await page.locator('div[role="button"]:has-text("Upcoming Test Event' + tomorrow.toLocaleDateString('en-US', {month: '2-digit'}) + '")').click();

//     // Verify we are directed to the event's settings page
//     await expect(page.locator('text=Event Settings')).toHaveCount(1);
//     await expect(page.locator('text=titleUpcoming Test Event >> p')).toHaveCount(1);
//     await expect(page.locator('text=Upcoming Test Topic')).toHaveCount(1);
//     await expect(page.locator('text=Upcoming Test Description')).toHaveCount(1);
// });

// test('User is directed back to Dashboard on refresh.', async ({ page }) => {
//     // Go to Dashboard
//     await page.goto('/dashboard');

//     // Refresh the Page
//     await page.reload();
//     await expect(page).toHaveURL('/dashboard');
// });

// test('User is directed to landing page if not logged in.', async ({ browser }) => {
//     // Use context without authentication
//     const context = await browser.newContext();
//     await context.clearCookies();
//     const page = await context.newPage();

//     // Attempt to navigate to Dashboard
//     await Promise.all([
//         page.waitForNavigation(),
//         page.goto('/dashboard'),
//     ]);

//     await expect(page).toHaveURL('/');
// });
