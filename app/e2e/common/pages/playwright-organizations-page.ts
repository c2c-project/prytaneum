// playwright-organizations-page.ts
import { Browser, expect, Locator, Page, TestInfo } from '@playwright/test';
import { Device, getIndexByDevice } from '@local/common/utils';

export class PlaywrightOrganizationsPage {
    readonly page: Page;
    readonly device: Device;

    readonly createOrganizationButton: Locator;
    readonly createOrganizationInput: Locator;
    readonly createOrganizationSubmitButton: Locator;

    constructor(page: Page, device: Device) {
        this.page = page;
        this.device = device;

        this.createOrganizationButton = page.locator('[data-test-id="create-organization-button"]');
        this.createOrganizationInput = page.locator('input[type="text"]');
        this.createOrganizationSubmitButton = page.locator('button:has-text("Create")');
    }

    /**
     * Allows for the reuse of authentication for the organization page tests
     * From playwright docs https://playwright.dev/docs/test-auth#testing-multiple-roles-with-pom-fixtures
     * The Parallel Index is used to isolate context between workers
     * You can find more info about the Parallel Index here: https://playwright.dev/docs/api/class-testinfo#test-info-parallel-index
     */
    async create(browser: Browser) {
        const deviceIndex = getIndexByDevice(this.device);
        const context = await browser.newContext({
            baseURL: process.env.BASE_URL || 'http://localhost:8080',
            storageState: `./common/state/organizer${deviceIndex}StorageState.json`,
        });
        const page = await context.newPage();
        return new PlaywrightOrganizationsPage(page, this.device);
    }

    async goto() {
        await this.page.goto('/organizations/me');
    }

    async clickOnCreateOrganization() {
        await this.createOrganizationButton.click();
    }

    async fillInOrganizationName(organizationName: string) {
        await this.createOrganizationInput.fill(organizationName);
    }

    async submitOrganizationForm() {
        await this.createOrganizationSubmitButton.click();
    }

    async clickOnOrganization(organizationName: string) {
        await Promise.all([
            await this.page.locator(`div[role="button"]:has-text("${organizationName}")`).first().click(),
            await this.page.waitForNavigation(),
        ]);
    }

    async clickDeleteOrganizationButton() {
        await this.page.locator('[aria-label="delete organization"]').first().click();
    }

    async clickConfirmDeleteOrganizationButton() {
        await this.page.locator('text=Confirm').click();
    }

    async clickOnCreateEvent() {
        await this.page.locator('text=New Event').click();
    }

    async fillInEventName(eventName: string) {
        await this.page.locator('text=Title *Title * >> input[type="text"]').fill(eventName);
        await this.page.locator('text=Topic *Topic * >> input[type="text"]').fill(`${eventName} Topic`);
        await this.page
            .locator('text=Description *Description * >> input[type="text"]')
            .fill(`${eventName} Description`);
    }

    async fillInEventTime(eventDate: Date) {
        // Today's Date is stored in variables to make the Start and End Date/Time selectors more readable
        const today = new Date();
        const todayMonth = today.toLocaleDateString('en-US', { month: 'short' });
        const todayDate = today.toLocaleDateString('en-US', { day: 'numeric' });
        const todayYear = today.getFullYear();
        
        // Set Start Date/Time
        await this.page
            .locator(
                `text=Start Date & Time *Start Date & Time * >> [aria-label="Choose date\\, selected date is ${todayMonth} ${todayDate}\\, ${todayYear}"]`
            )
            .click();
        await this.page.locator('[aria-label="calendar view is open\\, go to text input view"]').click();
        await this.page
            .locator('[placeholder="mm\\/dd\\/yyyy hh\\:mm \\(a\\|p\\)m"]')
            .fill(`${eventDate.toLocaleDateString()} 12:00 am`);
        await this.page.locator('text=OK').click();

        // Set End Date/Time
        await this.page
            .locator(
                `text=End Date & Time *End Date & Time * >> [aria-label="Choose date\\, selected date is ${todayMonth} ${todayDate}\\, ${todayYear}"]`
            )
            .click();
        await this.page.locator('[aria-label="calendar view is open\\, go to text input view"]').click();
        await this.page
            .locator('[placeholder="mm\\/dd\\/yyyy hh\\:mm \\(a\\|p\\)m"]')
            .fill(`${eventDate.toLocaleDateString()} 11:59 pm`);
        await this.page.locator('text=OK').click();
    }

    async submitEventForm() {
        await this.page.locator('button:has-text("Create")').click();
    }
}
