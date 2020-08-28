import React from 'react';
import Container from '@material-ui/core/Container';
import faker from 'faker';
import {
    BugReport as BugReportIcon,
    Feedback as FeedbackReportIcon,
} from '@material-ui/icons';

import {
    createFeedbackReport,
    createBugReport,
    deleteFeedbackReport,
    deleteBugReport,
} from '../api';
import { FeedbackForm, BugReportForm } from '../types';

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

// TODO: Ask David: A deleteEnpoint here has to be passed although it is not going to be used
const dummyFeedbackReportForm = {
    title: 'Feedback Form',
    mainDescription:
        'Let us know how we can improve your virtual town hall experience in the future. We strongly appreciate your feedback!',
    icon: <FeedbackReportIcon />,
    endpointFunctions: {
        submitEndpoint: (form: FeedbackForm) =>
            createFeedbackReport(form, new Date().toISOString()),
        deleteEndpoint: (_id: string) => deleteFeedbackReport(_id),
    },
};

const dummyBugReportForm = {
    title: 'Bug Report Form',
    mainDescription:
        'Let us know what went wrong during your virtual town hall experience. We strongly appreciate your time to complete this form',
    icon: <BugReportIcon />,
    endpointFunctions: {
        submitEndpoint: (form: BugReportForm) =>
            createBugReport(
                form,
                new Date().toISOString(),
                faker.random.alphaNumeric(12)
            ),
        deleteEndpoint: (_id: string) => deleteBugReport(_id),
    },
};

interface Props {
    ReportType: string;
}
export function ReportForm({ ReportType }: Props) {
    return (
        <Container maxWidth='sm'>
            {ReportType === 'Feedback' ? (
                <Component
                    title={dummyFeedbackReportForm.title}
                    mainDescription={dummyFeedbackReportForm.mainDescription}
                    icon={dummyFeedbackReportForm.icon}
                    endpointFunctions={
                        dummyFeedbackReportForm.endpointFunctions
                    }
                />
            ) : (
                <Component
                    title={dummyBugReportForm.title}
                    mainDescription={dummyBugReportForm.mainDescription}
                    icon={dummyBugReportForm.icon}
                    endpointFunctions={dummyBugReportForm.endpointFunctions}
                />
            )}
        </Container>
    );
}
