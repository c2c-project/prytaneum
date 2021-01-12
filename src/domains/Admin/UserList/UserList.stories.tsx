import React from 'react';

import UserProvider from 'contexts/User';
import Layout from 'layout';
import UserList from './UserList';

export default { title: 'Domains/Admin/User List' };

export function Basic() {
    return (
        <UserProvider>
            <Layout>
                <UserList />
            </Layout>
        </UserProvider>
    );
}

export function WithNav() {
    return (
        <UserProvider>
            <Layout showAsLoggedIn>
                <UserList />
            </Layout>
        </UserProvider>
    );
}
