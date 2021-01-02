import React from 'react';

import Layout from 'layout';
import Component from '.';

export default { title: 'Pages/Login' };

export function Basic() {
    return (
        <Layout>
            <Component onLogin={() => {}} />
        </Layout>
    );
}
