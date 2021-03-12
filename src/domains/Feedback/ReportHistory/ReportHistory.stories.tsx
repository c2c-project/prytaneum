import React from 'react';
import { Meta } from '@storybook/react';
import { makeUser } from 'prytaneum-typings';

import UserProvider from 'contexts/User';
import Component from '.';

export default { title: 'Domains/Feedback/Report History' } as Meta;

export function ReportHistory() {
    return (
        <UserProvider value={makeUser()} forceNoLogin>
            <Component />
        </UserProvider>
    );
}
