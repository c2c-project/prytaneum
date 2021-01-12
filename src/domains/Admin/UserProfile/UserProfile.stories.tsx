import React from 'react';

import Layout from 'layout';

import UserProvider from 'contexts/User';
import UserProfile from './UserProfile';

export default { title: 'Domains/Admin/User Profile' };

export function Basic() {
    return (
        <UserProvider>
            <Layout>
                <UserProfile userId='1234' />
            </Layout>
        </UserProvider>
    );
}
