import React from 'react';
import Container from '@material-ui/core/Container';
import faker from 'faker';

import {
    updateBugReport,
    updateFeedbackReport,
    deleteBugReport,
    deleteFeedbackReport,
} from '../api';
import { FeedbackForm, BugReportForm } from '../types';
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
    delete: (_id: string) => deleteFeedbackReport(_id),
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
    delete: (_id: string) => deleteBugReport(_id),
};

interface Props {
    ReportType: string;
}
export function ReportSummary({ ReportType }: Props) {
    return (
        <Container maxWidth='sm'>
            {ReportType === 'Feedback' ? (
                // TODO: How to mock functions in stories?
                <Component
                    reportObject={FeedbackReportObject}
                    callBack={() => {}}
                />
            ) : (
                <Component reportObject={BugReportObject} callBack={() => {}} />
            )}
        </Container>
    );
}
