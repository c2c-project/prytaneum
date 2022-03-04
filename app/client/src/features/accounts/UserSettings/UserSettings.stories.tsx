import * as React from 'react';
import Container from '@mui/material/Container';

import { UserProvider } from '@local/features/accounts/UserContext';
import Component from './UserSettings';

export default { title: '@local/domains/User/User Settings' };

export function UserSettings() {
    return (
        <Container maxWidth='md'>
            <UserProvider>
                <Component />
            </UserProvider>
        </Container>
    );
}
