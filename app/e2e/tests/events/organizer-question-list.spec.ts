import { PlaywrightEventLivePage } from '@local/common/pages';
import { test, expect } from '@local/common/utils/fixtures';
import { eventId } from './test.list';

export default function organizerQuestionList() {
    let eventLivePage: PlaywrightEventLivePage;

    test.beforeAll(async ({ browser, device }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        eventLivePage = await new PlaywrightEventLivePage(page, device, eventId).createWithOrganizerContext(browser);
    });

    test('I can see the event live page', async ({}) => {
        await eventLivePage.goto();
        expect(eventLivePage.page).toHaveURL(`/events/${eventLivePage.eventId}/live`);
    });

    test('I can see a question I created', async ({}) => {
        await eventLivePage.goto();
        await eventLivePage.goToQuestionsTab();
        await eventLivePage.clickOnAskQuestionButton();
        await eventLivePage.fillInQuestion('Organizer Question');
        await eventLivePage.submitQuestionForm();
        await expect(eventLivePage.findQuestion('Organizer Question')).toBeVisible();
    });
}
