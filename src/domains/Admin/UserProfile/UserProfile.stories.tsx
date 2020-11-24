import React from 'react';

import Page from 'layout/Page';
import Nav from 'layout/Nav';

import UserProfile from './UserProfile';

export default { title: 'Domains/Admin/User Profile' };

export function Basic() {
    return (
        <>
            <Nav />
            <main>
                <Page>
                    <UserProfile userId='1234' />
                </Page>
            </main>
        </>
    );
}
