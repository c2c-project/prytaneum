// https://playwright.dev/docs/test-parallel#use-a-test-list-file
import { test } from '@local/common/utils/fixtures';
import { PlaywrightOrganizationsPage } from '@local/common/pages';
import organizerTests from './organizer-dashboard.spec';
import userTests from './user-dashboard.spec';

// https://playwright.dev/docs/test-parallel#serial-mode
// Use `test.describe.configure({ mode: 'serial' });` to run tests in serial.
test.describe.configure({ mode: 'serial' });

const ORGANIZATION_NAME = 'Test Organization';

// Dashboard tests setup and teardown
// Create organization and events that can be used to test the dashboard
test.beforeAll(async ({ browser, device }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const organizationsPage = await new PlaywrightOrganizationsPage(page, device).create(browser);

    // Create organization
    await organizationsPage.goto();
    await organizationsPage.clickOnCreateOrganization();
    await organizationsPage.fillInOrganizationName(ORGANIZATION_NAME);
    await organizationsPage.submitOrganizationForm();

    // Create ongoing event
    await organizationsPage.clickOnOrganization(ORGANIZATION_NAME);
    await organizationsPage.clickOnCreateEvent();
    await organizationsPage.fillInEventName('Ongoing Event');
    await organizationsPage.fillInEventTime(organizationsPage.today);
    await organizationsPage.submitEventForm();

    // Create upcoming event
    await organizationsPage.clickOnCreateEvent();
    await organizationsPage.fillInEventName('Upcoming Event');
    await organizationsPage.fillInEventTime(organizationsPage.tomorrow);
    await organizationsPage.submitEventForm();
});

// Remove organization that was used to test the dashboard
test.afterAll(async ({ browser, device }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const organizationsPage = await new PlaywrightOrganizationsPage(page, device).create(browser);
    await organizationsPage.goto();
    await organizationsPage.clickDeleteOrganizationButton(ORGANIZATION_NAME);
    await organizationsPage.clickConfirmDeleteOrganizationButton();
});

test.describe('Organizer Dashboard Tests', organizerTests);
test.describe('User Dashboard Tests', userTests);
