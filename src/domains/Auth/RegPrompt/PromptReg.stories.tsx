import React from 'react';

import Layout from 'layout';
import UserProvider from 'contexts/User';
import Component from './PromptReg';

export default { title: 'Domains/Auth/Prompt Reg' };

export function Basic() {
    return (
        <UserProvider>
            <Layout>
                <Component forceOpen />
            </Layout>
        </UserProvider>
    );
}
