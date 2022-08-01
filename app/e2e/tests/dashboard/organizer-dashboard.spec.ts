import { test, expect } from '@local/common/utils/fixtures';
import { PlaywrightOrganizationsPage } from '@local/common/pages';

// Create organization and events that can be used to test the dashboard
test.beforeAll(async ({ browser, device }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const organizationsPage = await new PlaywrightOrganizationsPage(page, device).create(browser);

    // Create organization
    await organizationsPage.goto();
    await organizationsPage.clickOnCreateOrganization();
    await organizationsPage.fillInOrganizationName('Test Organization');
    await organizationsPage.submitOrganizationForm();

    // Create ongoing event
    const today = new Date();
    await organizationsPage.clickOnOrganization('Test Organization');
    await organizationsPage.clickOnCreateEvent();
    await organizationsPage.fillInEventName('Ongoing Event');
    await organizationsPage.fillInEventTime(today);
    await organizationsPage.submitEventForm();

    // Create upcoming event
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await organizationsPage.clickOnCreateEvent();
    await organizationsPage.fillInEventName('Upcoming Event');
    await organizationsPage.fillInEventTime(tomorrow);
    await organizationsPage.submitEventForm();
});

// Remove organization that was used to test the dashboard
test.afterAll(async ({ browser, device }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const organizationsPage = await new PlaywrightOrganizationsPage(page, device).create(browser);
    await organizationsPage.goto();
    await organizationsPage.clickDeleteOrganizationButton();
    await organizationsPage.clickConfirmDeleteOrganizationButton();
});

test.describe('Items Present on Dashboard', () => {
    test('I can see an event I created in the dashboard', async ({ dashboardPageOrganizer }) => {
        // Go to Dashboard
        await dashboardPageOrganizer.goto();

        // Select ongoing event
        const today = new Date();
        await dashboardPageOrganizer.clickOnEvent('Ongoing Event', today, 'Test Organization');

        // Verify we are directed to the event's settings page
        await expect(dashboardPageOrganizer.page).toHaveURL(/.*settings/);
    });

    test('I can see button to create event on dashboard.', async ({ dashboardPageOrganizer }) => {
        // Go to Dashboard
        await dashboardPageOrganizer.goto();

        // Click Create Event button
        await dashboardPageOrganizer.clickOnCreateEvent();
        await expect(dashboardPageOrganizer.page).toHaveURL('/organizations/me');
    });

    test('I can see sections for Current Events and Upcoming Events on dashboard.', async ({
        dashboardPageOrganizer,
    }) => {
        // Go to Dashboard
        await dashboardPageOrganizer.goto();

        // Check that Current Events div and text are present
        await expect(dashboardPageOrganizer.currentEventsSection).toHaveCount(1);

        // Check that Upcoming Events div and text are present
        await expect(dashboardPageOrganizer.upcomingEventsSection).toHaveCount(1);
    });
});

test.describe('Dashboard Navigation', () => {
    test('I can visit live feed of ongoing event from the dashboard.', async ({ dashboardPageOrganizer }) => {
        // Go to Dashboard
        await dashboardPageOrganizer.goto();

        // Select Live Feed
        await dashboardPageOrganizer.clickOnLiveFeed();
        await expect(dashboardPageOrganizer.page).toHaveURL(/.*live/);
    });

    test('I am directed back to dashboard upon refresh.', async ({ dashboardPageOrganizer }) => {
        // Go to Dashboard
        await dashboardPageOrganizer.goto();

        // Refresh
        await dashboardPageOrganizer.reload();
        await expect(dashboardPageOrganizer.page).toHaveURL('/dashboard');
    });

    test('I am directed to landing page if not logged in.', async ({ browser }) => {
        // Use context without authentication
        const context = await browser.newContext();
        const page = await context.newPage();

        // Attempt to navigate to Dashboard
        await page.goto('/dashboard');

        // Verify we are directed to the landing page
        await expect(page).toHaveURL('/');
    });
});
