import React from 'react';
import Container from '@material-ui/core/Container';
import faker from 'faker';

import Component from '.';
import { updateFeedbackReport, deleteFeedbackReport } from '../api';
import { FeedbackForm } from '../types';

export default { title: 'Domains/FormBase' };

const dummyReportObject = {
    Report: {
        _id: faker.random.alphaNumeric(12),
        description: faker.lorem.paragraphs(),
        date: new Date().toISOString(),
        user: {
            _id: faker.random.alphaNumeric(12),
        },
    },
    submitEndpoint: (form: FeedbackForm) => updateFeedbackReport(form),
    deleteEndpoint: (_id: string) => deleteFeedbackReport(_id),
};

export function FormBase() {
    return (
        <Container maxWidth='sm'>
            <Component
                reportObject={dummyReportObject}
                onSuccess={() => {}}
                callback={() => {}}
            />
        </Container>
    );
}
