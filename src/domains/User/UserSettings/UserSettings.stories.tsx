import React from 'react';
import Container from '@material-ui/core/Container';

import UserProvider from 'contexts/User';
import Component from './UserSettings';

export default { title: 'Domains/Auth' };

export function UserSettings() {
    return (
        <Container maxWidth='md'>
            <UserProvider>
                <Component />
            </UserProvider>
        </Container>
    );
}
