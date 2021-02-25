import React from 'react';
import Container from '@material-ui/core/Container';
import { Story, Meta } from '@storybook/react';
import faker from 'faker';

import Component, { FormProps } from './ReportForm';

export default {
    title: 'Domains/Feedback/Report Form',
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

const Template: Story<FormProps> = (props) => <Component {...props} />;

export const BugReport = Template.bind({});
BugReport.args = {
    reportType: 'Bug',
    townhallId: faker.random.alphaNumeric(12),
};

export const FeedbackReport = Template.bind({});
FeedbackReport.args = {
    reportType: 'Feedback',
};
