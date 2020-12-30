import React from 'react';

import Layout from 'layout';
import Component from '.';

export default { title: 'Pages/Auth/Login' };

export function Basic() {
    return (
        <Layout>
            <Component onLogin={() => {}} />
        </Layout>
    );
}
