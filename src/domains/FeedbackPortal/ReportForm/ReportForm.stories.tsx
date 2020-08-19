import React from 'react';
import Container from '@material-ui/core/Container';
import faker from 'faker';
import {
    BugReport as BugReportIcon,
    Feedback as FeedbackReportIcon,
} from '@material-ui/icons';

import Component from '.';

export default {
    title: 'Domains/ReportForm',
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

interface Props {
    ReportType: string;
}
export function ReportForm({ ReportType }: Props) {
    return (
        <Container maxWidth='sm'>
            {ReportType === 'Feedback' ? (
                <Component
                    Title={FeedbackReportForm.Title}
                    MainDescription={FeedbackReportForm.MainDescription}
                    Icon={FeedbackReportForm.Icon}
                    Type={FeedbackReportForm.Type}
                />
            ) : (
                <Component
                    Title={BugReportForm.Title}
                    MainDescription={BugReportForm.MainDescription}
                    Icon={BugReportForm.Icon}
                    Type={BugReportForm.Type}
                    townhallId={BugReportForm.townhallId}
                />
            )}
        </Container>
    );
}
