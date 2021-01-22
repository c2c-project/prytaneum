import React from 'react';

import UserProvider from 'contexts/User';
import Layout from 'layout';
import Dashboard from './Dashboard';

export default { title: 'Pages/Dashboard' };

export function Basic() {
    return (
        <UserProvider>
            <Layout showAsLoggedIn>
                <Dashboard />
            </Layout>
        </UserProvider>
    );
}
