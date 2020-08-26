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

const dummyFeedbackReportForm = {
    title: 'Feedback Form',
    mainDescription:
        'Let us know how we can improve your virtual town hall experience in the future. We strongly appreciate your feedback!',
    icon: <FeedbackReportIcon />,
    reportObject: {
        Report: {
            _id: '',
            description: '',
            date: '',
            user: {
                _id: '',
            },
        },
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
    reportObject: {
        Report: {
            _id: '',
            description: '',
            date: '',
            townhallId: '',
            user: {
                _id: '',
            },
        },
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
                    reportObject={dummyFeedbackReportForm.reportObject}
                />
            ) : (
                <Component
                    title={dummyBugReportForm.title}
                    mainDescription={dummyBugReportForm.mainDescription}
                    icon={dummyBugReportForm.icon}
                    reportObject={dummyBugReportForm.reportObject}
                />
            )}
        </Container>
    );
}
