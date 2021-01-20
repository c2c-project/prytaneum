import React from 'react';
import { Meta } from '@storybook/react';
import { makeQuestion } from 'prytaneum-typings';

import Component from '.';

export default {
    title: 'Domains/Questions/Question Thread',
    decorators: [
        (Story) => (
            <div style={{ flex: 1, padding: 60 }}>
                <Story />
            </div>
        ),
    ],
} as Meta;

export function Basic() {
    return <Component question={makeQuestion()} />;
}
