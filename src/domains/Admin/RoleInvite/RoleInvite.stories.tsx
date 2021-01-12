import React from 'react';

import Layout from 'layout';
import UserProvider from 'contexts/User';
import Component from './RoleInvite';

export default { title: 'Domains/Admin/Role Invite' };

export function Basic() {
    return (
        <UserProvider>
            <Layout showAsLoggedIn>
                <Component />
            </Layout>
        </UserProvider>
    );
}
