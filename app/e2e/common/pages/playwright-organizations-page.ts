// playwright-organizations-page.ts
import { expect, Locator, Page } from '@playwright/test';

export class PlaywrightOrganizationsPage {
    readonly page: Page;

    readonly CreateOrganizationButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.CreateOrganizationButton = page.locator('[data-test-id="create-organization-button"]');
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
