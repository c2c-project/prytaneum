// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

const recent = faker.date.recent();
const future = faker.date.future();

export function makeFeedbackReport() {
    return {
        _id: faker.random.alphaNumeric(12),
        description: faker.lorem.paragraph(),
        date: faker.date.between(recent, future).toISOString(),
        user: {
            _id: faker.random.alphaNumeric(12),
        },
        type: 'feedback',
    };
}

export function makeBugReport() {
    return {
        _id: faker.random.alphaNumeric(12),
        description: faker.lorem.paragraph(),
        date: faker.date.between(recent, future).toISOString(),
        townhallId: faker.random.alphaNumeric(12),
        user: {
            _id: faker.random.alphaNumeric(12),
        },
        type: 'bug',
    };
}
