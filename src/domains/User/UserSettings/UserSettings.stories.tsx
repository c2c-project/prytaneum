import React from 'react';
import Container from '@material-ui/core/Container';

import UserProvider from 'contexts/User';
import Component from './UserSettings';

export default { title: 'Domains/User/User Settings' };

export function UserSettings() {
    return (
        <Container maxWidth='md'>
            <UserProvider>
                <Component />
            </UserProvider>
        </Container>
    );
}
