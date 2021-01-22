import React from 'react';
import { Meta } from '@storybook/react';
import faker from 'faker';

import Component from '.';

export default {
    title: 'Domains/Feedback/Report Form',
    parameters: { layout: 'centered' },
} as Meta;

const dummyBugReportForm = {
    title: 'Bug Report Form',
    mainDescription:
        'Let us know what went wrong during your virtual town hall experience. We strongly appreciate your time to complete this form.',
};

export function Basic() {
    return (
        <Component
            title={dummyBugReportForm.title}
            description={dummyBugReportForm.mainDescription}
            reportType='Bug'
            townhallId={faker.random.alphaNumeric(12)}
        />
    );
}
