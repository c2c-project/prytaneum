// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker/locale/en';
import { FeedbackReport, BugReport } from './types';

const recent = faker.date.recent();
const future = faker.date.future();

export function makeFeedbackReport(): FeedbackReport {
    return {
        _id: faker.random.alphaNumeric(12),
        description: faker.lorem.paragraph(),
        date: faker.date.between(recent, future).toISOString(),
        submitterId: faker.random.alphaNumeric(12),
        type: 'Feedback',
    };
}

export function makeBugReport(): BugReport {
    return {
        _id: faker.random.alphaNumeric(12),
        description: faker.lorem.paragraph(),
        date: faker.date.between(recent, future).toISOString(),
        townhallId: faker.random.alphaNumeric(12),
        submitterId: faker.random.alphaNumeric(12),
        type: 'Bug',
    };
}
