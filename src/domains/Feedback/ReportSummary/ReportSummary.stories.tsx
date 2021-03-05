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
    decorators: [
        (MyStory) => (
            <Container maxWidth='sm'>
                <MyStory />
            </Container>
        ),
    ],
} as Meta;

export function ReportSummary() {
    return <Component report={makeFeedbackReport()} callBack={() => {}} />;
}
