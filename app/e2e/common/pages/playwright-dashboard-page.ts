// playwright-dashboard-page.ts
import { Browser, expect, Locator, Page } from '@playwright/test';
import { Device, getIndexByDevice } from '@local/common/utils';

export class PlaywrightDashboardPage {
    readonly page: Page;
    readonly device: Device;

    readonly currentEventsSection: Locator;
    readonly upcomingEventsSection: Locator;

    constructor(page: Page, device: Device) {
        this.page = page;
        this.device = device;

        this.currentEventsSection = page.locator('text=Current Events');
        this.upcomingEventsSection = page.locator('text=Upcoming Events');
    }

    /**
     * Allows for the reuse of authentication for the dashboard page tests
     * From playwright docs https://playwright.dev/docs/test-auth#testing-multiple-roles-with-pom-fixtures
     * The Parallel Index is used to isolate context between workers
     * You can find more info about the Parallel Index here: https://playwright.dev/docs/api/class-testinfo#test-info-parallel-index
     */
    async createWithOrganizerContext(browser: Browser) {
        const deviceIndex = getIndexByDevice(this.device);
        const storageState = `./common/state/organizer${deviceIndex}StorageState.json`;
        const context = await browser.newContext({
            baseURL: process.env.BASE_URL || 'http://localhost:8080',
            storageState,
        });
        const page = await context.newPage();
        return new PlaywrightDashboardPage(page, this.device);
    }

    async createWithUserContext(browser: Browser) {
        const deviceIndex = getIndexByDevice(this.device);
        const storageState = `./common/state/user${deviceIndex}StorageState.json`;
        const context = await browser.newContext({
            baseURL: process.env.BASE_URL || 'http://localhost:8080',
            storageState,
        });
        const page = await context.newPage();
        return new PlaywrightDashboardPage(page, this.device);
    }

    async goto() {
        await this.page.goto('/dashboard');
    }
}
