import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import UserProvider from '@local/contexts/User';
import { makeUser, makeTownhall } from 'prytaneum-typings';

import TownhallProvider from '@local/contexts/Townhall';
import Breakout from './Breakout';

export default {
    title: '@local/domains/Townhall/Breakout',
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
