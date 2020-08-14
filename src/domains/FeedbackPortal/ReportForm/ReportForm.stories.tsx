import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import faker from 'faker';
import {
    BugReport as BugReportIcon,
    Feedback as FeedbackReportIcon,
} from '@material-ui/icons';

import Component from '.';

export default { title: 'Domains/ReportForm' };

const FeedbackReportForm = {
    Title: 'Feedback Form',
    MainDescription:
        'Let us know how we can improve your virtual town hall experience in the future. We strongly appreciate your feedback!',
    Icon: <FeedbackReportIcon />,
    Type: 'feedback',
};

const BugReportForm = {
    Title: 'Bug Report Form',
    MainDescription:
        'Let us know what went wrong during your virtual town hall experience. We strongly appreciate your time to complete this form',
    Type: 'bug',
    Icon: <BugReportIcon />,
    townhallId: faker.random.alphaNumeric(12),
};

export function ReportForm() {
    return (
        <Container maxWidth='sm'>
            <Grid container spacing={10}>
                <Grid item>
                    <Component
                        Title={FeedbackReportForm.Title}
                        MainDescription={FeedbackReportForm.MainDescription}
                        Icon={FeedbackReportForm.Icon}
                        Type={FeedbackReportForm.Type}
                        Report={{
                            date: new Date().toISOString(),
                        }}
                    />
                </Grid>
                <Grid item>
                    <Component
                        Title={BugReportForm.Title}
                        MainDescription={BugReportForm.MainDescription}
                        Icon={BugReportForm.Icon}
                        Type={BugReportForm.Type}
                        Report={{
                            date: new Date().toISOString(),
                        }}
                        townhallId={BugReportForm.townhallId}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
