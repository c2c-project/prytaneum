// playwright-organizations-page.ts
import { Browser, expect, Locator, Page } from '@playwright/test';

export class PlaywrightOrganizationsPage {
    readonly page: Page;

    readonly CreateOrganizationButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.CreateOrganizationButton = page.locator('[data-test-id="create-organization-button"]');
    }

    // Allows for the reuse of authentication for the organization page tests
    // From playwright docs https://playwright.dev/docs/test-auth#testing-multiple-roles-with-pom-fixtures
    async create(browser: Browser) {
        const context = await browser.newContext({
            baseURL: process.env.BASE_URL || 'http://localhost:8080',
            storageState: './common/state/organizerStorageState.json',
        });
        const page = await context.newPage();
        return new PlaywrightOrganizationsPage(page);
    }

    async goto() {
        await this.page.goto('/organizations/me');
    }

    async clickOnCreateOrganization() {
        await this.CreateOrganizationButton.click();
    }

    async fillInOrganizationName(organizationName: string) {}

    async submitOrganizationForm() {}

    async clickOnOrganization(organizationName: string) {}

    async clickDeleteOrganizationButton(organizationName: string) {}
}
