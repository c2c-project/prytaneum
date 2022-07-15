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
    await organizationsPage.page.screenshot({
        path: `./common/screenshots/${device}/organizationsCreated.png`,
    });
});

// Remove organization and events that were used to test the dashboard
test.afterAll(async ({ browser, device }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const organizationsPage = await new PlaywrightOrganizationsPage(page, device).create(browser);
    await organizationsPage.goto();
    await organizationsPage.clickDeleteOrganizationButton();
    await organizationsPage.clickConfirmDeleteOrganizationButton();
    await organizationsPage.page.screenshot({
        path: `./common/screenshots/${device}/organizationsDeleted.png`,
    });
});

test('I can see an event I created in the dashboard', async ({ dashboardPageOrganizer }) => {
    await dashboardPageOrganizer.goto();
    await expect(dashboardPageOrganizer.page).toHaveURL('/dashboard');
    // await dashboardPageOrganizer.clickOnEvent('Test Event');
});
