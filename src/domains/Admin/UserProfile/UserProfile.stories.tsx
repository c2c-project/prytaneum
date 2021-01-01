import React from 'react';

import Layout from 'layout';

import UserProfile from './UserProfile';

export default { title: 'Domains/Admin/User Profile' };

export function Basic() {
    return (
        <Layout>
            <UserProfile userId='1234' />
        </Layout>
    );
}
