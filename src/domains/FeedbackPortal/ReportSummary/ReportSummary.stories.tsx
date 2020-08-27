import React from 'react';
import Container from '@material-ui/core/Container';
import faker from 'faker';

import Component from '.';

export default {
    title: 'Domains/ReportSummary',
    component: Component,
};

const dummyFeedbackReport = {
    description: faker.lorem.paragraph(),
    date: new Date().toISOString(),
    _id: faker.random.alphaNumeric(12),
    user: {
        _id: faker.random.alphaNumeric(12),
    },
    type: 'Feedback',
};

export function ReportSummary() {
    return (
        <Container maxWidth='sm'>
            <Component report={dummyFeedbackReport} callBack={() => {}} />
        </Container>
    );
}
