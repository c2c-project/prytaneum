import { Browser, expect, Locator, Page } from '@playwright/test';
import { Device, getIndexByDevice } from '@local/common/utils';

export class PlaywrightAboutUsPage {
    readonly page: Page;
    readonly device: Device;
    readonly logo: Locator;
    readonly directorsImage: Locator;
    readonly title: Locator;
    readonly description: Locator;

    constructor(page: Page, device: Device) {
        this.page = page;
        this.device = device;

        this.logo = page.locator('text=Technology to Enhance DemocracyOur Journey >> img[alt="Prytaneum Logo"]');
        this.directorsImage = page.locator('img[alt="Directors"]');
        this.title = page.locator('text=Our Journey');
        this.description = page.locator('main div:has-text("Built by the University of California, Riverside\'s Technology, Communication and")').nth(1);
    }

    async create(browser: Browser) {
        const deviceIndex = getIndexByDevice(this.device);
        const context = await browser.newContext({
            baseURL: process.env.BASE_URL || 'http://localhost:8080',
            storageState: `./common/state/organizer${deviceIndex}StorageState.json`,
        });
        const page = await context.newPage();
        return new PlaywrightAboutUsPage(page, this.device);
    }

    async goto() {
        await this.page.goto('/aboutus');
    }
}