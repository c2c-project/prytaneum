import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Component from '.';

export default { title: 'Domains/ReportSummary' };

const FeedbackReportSummary = {
    Report: {
        description:
            'This is a feedback report. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utev. adipiscing elit, sed do eiusmod tempor incididunt. adipiscing elit, sed do eiusmod tempor incididunt',
        date: new Date().toISOString(),
        _id: 'b63124n62345gb2345n3451345n',
    },
    Type: 'feedback',
};

const BugReportSummary = {
    Report: {
        description:
            'This is a bug report. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utev. adipiscing elit, sed do eiusmod tempor incididunt. adipiscing elit, sed do eiusmod tempor incididunt',
        date: new Date().toISOString(),
        _id: 'b63124n62345gb2345n3451345n',
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
