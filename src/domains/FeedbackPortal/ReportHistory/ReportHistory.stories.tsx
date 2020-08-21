import React from 'react';
import faker from 'faker';
import FixtureContext, { makeSuccessFixture } from 'mock/Fixtures';

import Component from '.';

export default { title: 'Domains/ReportHistory' };

const recent = faker.date.recent();
const future = faker.date.future();

const makeBaseReport = () => ({
    _id: faker.random.alphaNumeric(5),
    date: faker.date.between(recent, future),
    description: faker.lorem.paragraphs(),
    user: {
        _id: faker.random.alphaNumeric(5),
    },
});

const makeFeedbackReports = (amount: number) => {
    const feedbackReports = [];
    for (let i = 0; i < amount; i += 1) {
        feedbackReports.push(makeBaseReport());
    }
    return feedbackReports;
};

const makeBugReports = (amount: number) => {
    const bugReports = [];
    for (let i = 0; i < amount; i += 1) {
        const tempReport = makeBaseReport();
        bugReports.push({
            ...tempReport,
            townhallId: faker.random.alphaNumeric(12),
        });
    }
    return bugReports;
};
export function ReportSummary() {
    return (
        <FixtureContext.Provider
            value={makeSuccessFixture({
                reports: [...makeFeedbackReports(10), ...makeBugReports(10)],
            })}
        >
            <Component />
        </FixtureContext.Provider>
    );
}
