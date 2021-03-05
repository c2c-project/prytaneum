import React from 'react';
import { Meta, Story } from '@storybook/react';
import UserProvider from 'contexts/User';
import { makeUser, makeTownhall } from 'prytaneum-typings';

import TownhallProvider from 'contexts/Townhall';
import Breakout from './Breakout';

export default {
    title: 'Domains/Townhall/Breakout',
    decorators: [
        (MyStory) => (
            <TownhallProvider townhallId='123' forceNoFetch value={makeTownhall()}>
                <UserProvider value={makeUser()} forceNoLogin>
                    <MyStory />
                </UserProvider>
            </TownhallProvider>
        ),
    ],
    parameters: {
        layout: 'padded',
    },
} as Meta;

const Template: Story<{}> = () => <Breakout />;

export const User = Template.bind({});
