import * as React from 'react';
import { Meta } from '@storybook/react';
import { makeUser } from 'prytaneum-typings';

import UserProvider from '@local/contexts/User';
import Component from '.';

export default { title: '@local/domains/Feedback/Report History' } as Meta;

export function ReportHistory() {
    return (
        <UserProvider value={makeUser()} forceNoLogin>
            <Component />
        </UserProvider>
    );
}
