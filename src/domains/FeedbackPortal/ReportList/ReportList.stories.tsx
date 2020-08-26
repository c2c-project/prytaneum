import React from 'react';
import Container from '@material-ui/core/Container';
import faker from 'faker';

import { updateFeedbackReport, deleteFeedbackReport } from '../api';
import { FeedbackForm, ReportObject } from '../types';
import Component from '.';

export default {
    title: 'Domains/ReportList',
    component: Component,
};

const recent = faker.date.recent();
const future = faker.date.future();

const makeReportObject = () => ({
    Report: {
        _id: faker.random.alphaNumeric(12),
        date: faker.date.between(recent, future).toISOString(),
        description: faker.lorem.paragraphs(),
        user: {
            _id: faker.random.alphaNumeric(12),
        },
    },
    submitEndpoint: (form: FeedbackForm) => updateFeedbackReport(form),
    deleteEndpoint: (_id: string) => deleteFeedbackReport(_id),
});

const makeReportObjects = (numberOfReports: number) => {
    const list = [];
    for (let i = 0; i < numberOfReports; i += 1) {
        list.push(makeReportObject());
    }
    return list;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockFunction = (report: ReportObject) => {};

export function ReportList() {
    return (
        <Container maxWidth='sm'>
            <Component
                reportObjects={makeReportObjects(10)}
                onUpdate={mockFunction}
                onDelete={mockFunction}
            />
        </Container>
    );
}
