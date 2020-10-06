import React from 'react';
import Container from '@material-ui/core/Container';

import UserContextProvider from 'contexts/User';
import Component from './UserSettings';

export default { title: 'Domains/Auth' };

export function UserSettings() {
    return (
        <Container maxWidth='md'>
            <UserContextProvider>
                <Component />
            </UserContextProvider>
        </Container>
    );
}
