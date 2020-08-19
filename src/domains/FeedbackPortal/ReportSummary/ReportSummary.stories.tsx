import React from 'react';
import Container from '@material-ui/core/Container';
import faker from 'faker';

import Component from '.';

// TODO: For some reason, the select control does not change what component gets rendered.
export default {
    title: 'Domains/ReportSummary',
    component: Component,
    argTypes: {
        ReportType: {
            control: {
                type: 'select',
                options: ['Feedback', 'Bug'],
            },
        },
    },
};

const FeedbackReportSummary = {
    Report: {
        description: 'xdf',
        date: new Date().toISOString(),
        _id: faker.random.alphaNumeric(12),
    },
    Type: 'feedback',
};

const BugReportSummary = {
    Report: {
        description: 'xdb',
        date: new Date().toISOString(),
        _id: faker.random.alphaNumeric(12),
        townhallId: faker.random.alphaNumeric(12),
    },
    Type: 'bug',
};

interface Props {
    ReportType: string;
}
export function ReportSummary({ ReportType }: Props) {
    return (
        <Container maxWidth='sm'>
            {ReportType === 'Feedback' ? (
                <Component
                    Report={FeedbackReportSummary.Report}
                    Type={FeedbackReportSummary.Type}
                />
            ) : (
                <Component
                    Report={BugReportSummary.Report}
                    Type={BugReportSummary.Type}
                />
            )}
        </Container>
    );
}
