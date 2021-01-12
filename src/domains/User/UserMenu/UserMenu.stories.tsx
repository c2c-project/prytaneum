import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeUser } from 'prytaneum-typings';

import UserProvider from 'contexts/User';
import AppBar from 'layout/AppBar';
import UserMenu from './UserMenu';

export default { title: 'Domains/User/User Menu' };

export function Basic() {
    return (
        <UserProvider value={makeUser()}>
            <AppBar>
                <Grid container justify='flex-end'>
                    <UserMenu
                        links={{ settings: '/settings', logout: '/logout' }}
                    />
                </Grid>
            </AppBar>
        </UserProvider>
    );
}
