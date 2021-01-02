import React from 'react';

import UserProvider from 'contexts/User';
import Layout from 'layout';
import Component from '.';

export default { title: 'Pages/Townhall' };

export function TownhallList() {
    return (
        <UserProvider>
            <Layout showAsLoggedIn>
                <Component />
            </Layout>
        </UserProvider>
    );
}
