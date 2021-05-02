import * as React from 'react';
import { Meta } from '@storybook/react';
import { makeReportReply } from 'prytaneum-typings';

import Component from '.';

export default {
    title: '@local/domains/Feedback/Reply',
    parameters: {
        layout: 'centered',
    },
} as Meta;

export function Reply() {
    return <Component reply={makeReportReply()} />;
}
