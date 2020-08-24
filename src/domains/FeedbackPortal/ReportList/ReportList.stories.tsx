import React from 'react';
import Container from '@material-ui/core/Container';
import faker from 'faker';

import { updateFeedbackReport, deleteFeedbackReport } from '../api';
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
    update: updateFeedbackReport,
    delete: deleteFeedbackReport,
});

const makeReportObjects = (numberOfReports: number) => {
    const list = [];
    for (let i = 0; i < numberOfReports; i += 1) {
        list.push(makeReportObject());
    }
    return list;
};

export function ReportList() {
    return (
        <Container maxWidth='sm'>
            <Component ReportObjects={makeReportObjects(10)} />
        </Container>
    );
}
