import React from 'react';

import Main from 'layout/Main';
import AppBar from 'layout/AppBar';

import UserProfile from './UserProfile';

export default { title: 'Domains/Admin/User Profile' };

export function Basic() {
    return (
        <>
            <AppBar />
            <main>
                <Main>
                    <UserProfile userId='1234' />
                </Main>
            </main>
        </>
    );
}
