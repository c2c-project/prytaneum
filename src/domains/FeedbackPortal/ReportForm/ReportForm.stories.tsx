import React from 'react';
import Container from '@material-ui/core/Container';
import faker from 'faker';
import Component from '.';

export default {
    title: 'Domains/Feedback/Report Form',
    component: Component,
};

const dummyBugReportForm = {
    title: 'Bug Report Form',
    mainDescription:
        'Let us know what went wrong during your virtual town hall experience. We strongly appreciate your time to complete this form.',
};

export function Basic() {
    return (
        <Container maxWidth='sm'>
            <Component
                title={dummyBugReportForm.title}
                description={dummyBugReportForm.mainDescription}
                reportType='Bug'
                townhallId={faker.random.alphaNumeric(12)}
            />
        </Container>
    );
}
