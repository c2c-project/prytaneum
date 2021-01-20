import React from 'react';
import { Meta } from '@storybook/react';
import { makeQuestion } from 'prytaneum-typings';

import UserProvider from 'contexts/User';
import TownhallProvider from 'contexts/Townhall';
import Component from './ReplyForm';

export default {
    title: 'Domains/Questions/Reply Form',
    parameters: { layout: 'centered' },
    decorators: [
        (MyStory) => (
            <TownhallProvider townhallId='123'>
                <UserProvider>
                    <MyStory />
                </UserProvider>
            </TownhallProvider>
        ),
    ],
} as Meta;

export function Basic() {
    return <Component replyTo={makeQuestion()} />;
}
