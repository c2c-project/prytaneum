// https://playwright.dev/docs/test-parallel#use-a-test-list-file
import { test } from '@local/common/utils/fixtures';
import { PlaywrightOrganizationsPage } from '@local/common/pages';
import organizerTests from './organizer-dashboard.spec';
import userTests from './user-dashboard.spec';

// Tests in ilst can be run in parallel as long as the setup/teardown is the same for all test suites.
// If the setup/teardown is different for any test suite, then tests should be run in serial.
// https://playwright.dev/docs/test-parallel#serial-mode
// Use `test.describe.configure({ mode: 'serial' });` to run tests in serial.

// Dashboard tests setup and teardown
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

test.describe('Organizer Dashboard Tests', organizerTests);
test.describe('User Dashboard Tests', userTests);
