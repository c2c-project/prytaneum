import React from 'react';
import Main from 'layout/Main';
import AppBar from 'layout/AppBar';

import UserList from './UserList';

export default { title: 'Domains/Admin/User List' };

export function Basic() {
    return (
        <>
            <AppBar />
            <main>
                <Main>
                    <UserList />
                </Main>
            </main>
        </>
    );
}
