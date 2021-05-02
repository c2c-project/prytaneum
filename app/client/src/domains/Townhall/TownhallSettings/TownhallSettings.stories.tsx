import React from 'react';
import { Meta } from '@storybook/react';

import UserProvider from 'contexts/User';
import TownhallProvider from 'contexts/Townhall';
import Component from './TownhallSettings';

export default {
    title: 'Domains/Townhall/Townhall Settings',
    decorators: [
        (MyStory) => (
            <div style={{ flex: 1, padding: 60 }}>
                <MyStory />
            </div>
        ),
    ],
} as Meta;

export function Basic() {
    return (
        <UserProvider>
            <TownhallProvider townhallId='123'>
                <Component />
            </TownhallProvider>
        </UserProvider>
    );
}
