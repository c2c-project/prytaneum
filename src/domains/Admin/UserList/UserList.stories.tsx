import React from 'react';
import Page from 'layout/Page';
import Nav from 'layout/Nav';

import UserList from './UserList';

export default { title: 'Domains/Admin/User List' };

export function Basic() {
    return (
        <>
            <Nav />
            <main>
                <Page>
                    <UserList />
                </Page>
            </main>
        </>
    );
}
