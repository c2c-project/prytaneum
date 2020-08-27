import React from 'react';
import Container from '@material-ui/core/Container';
import faker from 'faker';

import Component from '.';

export default { title: 'Domains/FormBase' };

const dummyReport = {
    _id: faker.random.alphaNumeric(12),
    description: faker.lorem.paragraphs(),
    date: new Date().toISOString(),
    user: {
        _id: faker.random.alphaNumeric(12),
    },
    type: 'Feedback',
};

export function FormBase() {
    return (
        <Container maxWidth='sm'>
            <Component
                report={dummyReport}
                onSuccess={() => {}}
                callback={() => {}}
            />
        </Container>
    );
}
