// playwright-event-settings-page.ts
import { expect, Locator, Page } from '@playwright/test';

export class PlaywrightEventSettingsPage {
    readonly page: Page;
    readonly eventId: string;

    constructor(page: Page, eventId: string) {
        this.page = page;
        this.eventId = eventId;
    }

    async goto() {
        await this.page.goto(`/events/${this.eventId}/settings`);
    }
}
