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
}
