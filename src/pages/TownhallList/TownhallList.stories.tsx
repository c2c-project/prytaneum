import React from 'react';

import UserProvider from 'contexts/User';
import Layout from 'layout';
import Component from '.';

export default { title: 'Pages/Townhall List' };

export function Basic() {
    return (
        <UserProvider>
            <Layout showAsLoggedIn>
                <Component />
            </Layout>
        </UserProvider>
    );
}
