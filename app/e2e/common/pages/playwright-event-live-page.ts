// playwright-event-live-page.ts
import { expect, Locator, Page } from '@playwright/test';

export class PlaywrightEventLivePage {
    readonly page: Page;
    readonly eventId: string;

    constructor(page: Page, eventId: string) {
        this.page = page;
        this.eventId = eventId;
    }

    async goto(eventId: string) {
        await this.page.goto(`/events/${eventId}/live`);
    }
}
