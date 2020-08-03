import React from 'react';
import Container from '@material-ui/core/Container';
import Component from '.';

export default { title: 'Domains/ReportForm' };

const dummyReportForm = {
    Title: 'Feedback Form',
    MainDescription:
        'Let us know how we can improve your virtual town hall experience in the future. We strongly appreciate your feedback!',
    CreateReportEndpoint: '/api/feedback/create-report',
};

export function FormBase() {
    return (
        <Container maxWidth='sm'>
            <Component
                Title={dummyReportForm.Title}
                MainDescription={dummyReportForm.MainDescription}
                CreateReportEndpoint={dummyReportForm.CreateReportEndpoint}
            />
        </Container>
    );
}
