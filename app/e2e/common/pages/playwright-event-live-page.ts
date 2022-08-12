// playwright-event-live-page.ts
import { Browser, expect, Locator, Page } from '@playwright/test';
import { Device, getIndexByDevice } from '@local/common/utils';

export class PlaywrightEventLivePage {
    readonly page: Page;
    readonly device: Device;
    readonly eventId: string;
    readonly isModerator: boolean;

    constructor(page: Page, device: Device, eventId: string, isModerator = false) {
        this.page = page;
        this.device = device;
        this.eventId = eventId;
        this.isModerator = isModerator;
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
        return new PlaywrightEventLivePage(page, this.device, this.eventId, true);
    }

    async createWithUserContext(browser: Browser) {
        const deviceIndex = getIndexByDevice(this.device);
        const storageState = `./common/state/user${deviceIndex}StorageState.json`;
        const context = await browser.newContext({
            baseURL: process.env.BASE_URL || 'http://localhost:8080',
            storageState,
        });
        const page = await context.newPage();
        return new PlaywrightEventLivePage(page, this.device, this.eventId, false);
    }

    async goto() {
        await this.page.goto(`/events/${this.eventId}/live`);
    }

    async clickOnAskQuestionButton() {
        await this.page.locator('text=Ask My Question').click();
    }

    async fillInQuestion(question: string) {
        await this.page.locator('textarea[name="question"]').fill(question);
    }

    async submitQuestionForm() {
        await this.page.locator('div[role="dialog"] >> text=Ask').click();
    }

    async goToQueueTab() {
        if (this.isModerator) {
            await this.page.locator('button:has-text("Queue")').click();
        }
    }

    async goToQuestionsTab() {
        await this.page.locator('button:has-text("Questions")').click();
    }

    async goToFeedbacktab() {
        await this.page.locator('button:has-text("Feedback")').click();
    }

    findQuestion(question: string) {
        return this.page.locator(`li:has-text("${question}")`);
    }
}
