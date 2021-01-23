import React from 'react';
import { Meta } from '@storybook/react';

import TownhallProvider from 'contexts/Townhall';
import UserProvider from 'contexts/User';
import Component from './TownhallPane';

export default {
    title: 'Domains/Townhall/Townhall Pane',
    decorators: [
        (MyStory) => (
            <UserProvider>
                <TownhallProvider townhallId='123'>
                    <MyStory />
                </TownhallProvider>
            </UserProvider>
        ),
    ],
    parameters: {
        layout: 'centered',
    },
} as Meta;

export function Basic() {
    return <Component />;
}
