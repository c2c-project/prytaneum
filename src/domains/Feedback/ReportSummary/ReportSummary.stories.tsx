import React from 'react';
import { Meta } from '@storybook/react';
import Container from '@material-ui/core/Container';

import Component from '.';
import { makeFeedbackReport } from '../reportMaker.mock';

export default {
    title: 'Domains/Feedback/Report Summary',
    component: Component,
    parameters: {
        layout: 'centered',
    },
} as Meta;

export function ReportSummary() {
    return (
        <Container maxWidth='sm'>
            <Component report={makeFeedbackReport()} callBack={() => {}} />
        </Container>
    );
}
