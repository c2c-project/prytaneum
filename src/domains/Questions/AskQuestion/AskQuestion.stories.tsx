/* eslint-disable react/prop-types */
import React from 'react';
import { Meta, Story } from '@storybook/react';
import { makeTownhall, makeUser, User } from 'prytaneum-typings';

import TownhallProvider from 'contexts/Townhall';
import UserProvider from 'contexts/User';
import AskQuestion from './AskQuestion';

export default {
    title: 'Domains/Questions/Ask Question',
    component: AskQuestion,
    parameters: { layout: 'centered' },
    decorators: [
        (MyStory) => (
            <TownhallProvider value={makeTownhall()} forceNoFetch townhallId='123'>
                <MyStory />
            </TownhallProvider>
        ),
    ],
} as Meta;

const Template: Story<{ user: User }> = ({ user }) => (
    <UserProvider value={user} forceNoLogin>
        <AskQuestion />
    </UserProvider>
);

export const SignedIn = Template.bind({});
SignedIn.args = {
    user: makeUser(),
};

export const SignedOut = Template.bind({});
SignedOut.args = {
    user: undefined,
};
