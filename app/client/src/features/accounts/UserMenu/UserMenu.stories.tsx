import * as React from 'react';
import { Meta } from '@storybook/react';

import { UserProvider } from '@local/contexts/User';
import { UserMenu } from './UserMenu';

export default { title: '@local/domains/User/User Menu', parameters: { layout: 'centered' } } as Meta;

export function Basic() {
    return (
        <UserProvider>
            <UserMenu links={{ settings: '/settings', logout: '/logout' }} />
        </UserProvider>
    );
}
