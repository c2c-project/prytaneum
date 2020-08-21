import React from 'react';
import Container from '@material-ui/core/Container';
import faker from 'faker';

import Component from '.';
import { updateFeedbackReport } from '../api';

export default { title: 'Domains/FormBase' };

const dummyReport = {
    description: faker.lorem.paragraphs(),
    date: new Date().toISOString(),
    user: {
        _id: faker.random.alphaNumeric(12),
    },
};

export function FormBase() {
    return (
        <Container maxWidth='sm'>
            <Component
                Report={dummyReport}
                onSuccess={() => {}}
                SubmitEndpoint={(form) => updateFeedbackReport(form)}
            />
        </Container>
    );
}
