import { test } from '@local/common/utils/fixtures';
import { PlaywrightOrganizationsPage } from '@local/common/pages';
import organizerQuestionList from './organizer-question-list.spec';
import userQuestionList from './user-question-list.spec';

// https://playwright.dev/docs/test-parallel#serial-mode
test.describe.configure({ mode: 'serial' });

export let eventId = '';

// Dashboard tests setup and teardown
// Create organization and events that can be used to test the dashboard
test.beforeAll(async ({ browser, device }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const organizationsPage = await new PlaywrightOrganizationsPage(page, device).create(browser);

    // Create organization
    await organizationsPage.goto();
    await organizationsPage.clickOnCreateOrganization();
    await organizationsPage.fillInOrganizationName('Event Live Test Org');
    await organizationsPage.submitOrganizationForm();

    // Create ongoing event
    await organizationsPage.clickOnOrganization('Event Live Test Org');
    await organizationsPage.clickOnCreateEvent();
    await organizationsPage.fillInEventName('Test Event');
    await organizationsPage.fillInEventTime(organizationsPage.today);
    await organizationsPage.submitEventForm();
    await organizationsPage.clickOnEvent('Test Event');

    const url = organizationsPage.page.url();
    // http://localhost/events/[eventId]/settings
    // ['http', '', 'localhost', 'events', '[eventId]', 'settings']
    eventId = url.split('/')[4];
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

test.describe('Organizer Question List Tests', organizerQuestionList);
test.describe('User Question List Tests', userQuestionList);
