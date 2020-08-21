import React from 'react';
import Container from '@material-ui/core/Container';
import faker from 'faker';

import {
    updateBugReport,
    updateFeedbackReport,
    deleteBugReport,
    deleteFeedbackReport,
    FeedbackForm,
    BugReportForm,
} from '../api';
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

const FeedbackReportObject = {
    Report: {
        description: faker.lorem.paragraph(),
        date: new Date().toISOString(),
        _id: faker.random.alphaNumeric(12),
        user: {
            _id: faker.random.alphaNumeric(12),
        },
    },
    update: (form: FeedbackForm) => updateFeedbackReport(form),
    delete: (form: FeedbackForm) => deleteFeedbackReport(form),
};

const BugReportObject = {
    Report: {
        description: faker.lorem.paragraph(),
        date: new Date().toISOString(),
        _id: faker.random.alphaNumeric(12),
        townhallId: faker.random.alphaNumeric(12),
        user: {
            _id: faker.random.alphaNumeric(12),
        },
    },
    update: (form: BugReportForm) => updateBugReport(form),
    delete: (form: BugReportForm) => deleteBugReport(form),
};

interface Props {
    ReportType: string;
}
export function ReportSummary({ ReportType }: Props) {
    return (
        <Container maxWidth='sm'>
            {ReportType === 'Feedback' ? (
                <Component
                    ReportObject={FeedbackReportObject}
                    callBack={() => {}}
                />
            ) : (
                <Component ReportObject={BugReportObject} callBack={() => {}} />
            )}
        </Container>
    );
}
