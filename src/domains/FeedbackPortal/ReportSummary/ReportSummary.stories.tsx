import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import faker from 'faker';

import Component from '.';

export default { title: 'Domains/ReportSummary' };

const FeedbackReportSummary = {
    Report: {
        description: faker.lorem.paragraphs(),
        date: new Date().toISOString(),
        _id: faker.random.alphaNumeric(12),
    },
    Type: 'feedback',
};

const BugReportSummary = {
    Report: {
        description: faker.lorem.paragraphs(),
        date: new Date().toISOString(),
        _id: faker.random.alphaNumeric(12),
        townhallId: faker.random.alphaNumeric(12),
    },
    Type: 'bug',
};

export function ReportSummary() {
    return (
        <Container maxWidth='sm'>
            <Grid container spacing={10}>
                <Grid item>
                    <Component
                        Report={FeedbackReportSummary.Report}
                        Type={FeedbackReportSummary.Type}
                    />
                </Grid>
                <Grid item>
                    <Component
                        Report={BugReportSummary.Report}
                        Type={BugReportSummary.Type}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
