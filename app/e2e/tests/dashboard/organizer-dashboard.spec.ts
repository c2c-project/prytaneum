import { test, expect } from '@local/common/utils/fixtures';

export default function organizerTests() {
    test.describe('Items Present', () => {
        test('I can see an ongoing event I created', async ({ dashboardPageOrganizer }) => {
            // Go to Dashboard
            await dashboardPageOrganizer.goto();

            // Select ongoing event
            await dashboardPageOrganizer.clickOnEvent('Ongoing Event', 'Test Organization', true);

            // Verify we are directed to the event's settings page
            await dashboardPageOrganizer.page.waitForURL(/.*settings/);

            await expect(dashboardPageOrganizer.page).toHaveURL(/.*settings/);
        });

        test('I can see sections for Current Events and Upcoming Events.', async ({
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

    test.describe('Navigation', () => {
        test('I can visit live feed of ongoing event.', async ({ dashboardPageOrganizer }) => {
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
            await page.waitForURL('/');
            await expect(page).toHaveURL('/');
        });
    });
}
