import React from 'react';

import UserProvider from 'contexts/User';
import Layout from 'layout';
import Component from '.';

export default { title: 'Pages/Forgot Pass Reset' };

export function Basic() {
    return (
        <UserProvider forceNoLogin>
            <Layout>
                <Component token='asdf' />
            </Layout>
        </UserProvider>
    );
}
