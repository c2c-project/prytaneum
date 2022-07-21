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

test('I can see an event I created in the dashboard', async ({ dashboardPageUser }) => {
    await dashboardPageUser.goto();
    await expect(dashboardPageUser.page).toHaveURL('/dashboard');
});

// TODO: add more tests here
