import * as React from 'react';
import { Meta } from '@storybook/react';
import { makeTownhall, makeUser } from 'prytaneum-typings';

import TownhallProvider from '@local/contexts/Townhall';
import UserProvider from '@local/contexts/User';
import Component from './EventDetailsCard';

export default { title: '@local/domains/Townhall/Info Card', parameters: { layout: 'centered' } } as Meta;

export function InfoCard() {
    return (
        <UserProvider value={makeUser()} forceNoLogin>
            <TownhallProvider townhallId='123' forceNoFetch value={makeTownhall()}>
                <Component />
            </TownhallProvider>
        </UserProvider>
    );
}
