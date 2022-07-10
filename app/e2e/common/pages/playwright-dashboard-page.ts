// playwright-dashboard-page.ts
import { expect, Locator, Page } from '@playwright/test';

export class PlaywrightDashboardPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('/dashboard');
    }
}
