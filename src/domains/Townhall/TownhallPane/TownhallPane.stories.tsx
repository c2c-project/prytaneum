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
                    <div style={{ padding: 30, flex: 1 }}>
                        <MyStory />
                    </div>
                </TownhallProvider>
            </UserProvider>
        ),
    ],
} as Meta;

export function Basic() {
    return <Component />;
}
