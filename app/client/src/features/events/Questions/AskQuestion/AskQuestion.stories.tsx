/* eslint-disable react/prop-types */
import * as React from 'react';
import { Meta, Story } from '@storybook/react';
\
import TownhallProvider from '@local/contexts/Townhall';
import {UserProvider} from '@local/contexts/User';
import AskQuestion from './AskQuestion';

export default {
    title: '@local/domains/Questions/Ask Question',
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
