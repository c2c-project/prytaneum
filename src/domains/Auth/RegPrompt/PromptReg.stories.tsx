import React from 'react';

import Layout from 'layout';
import Component from './PromptReg';

export default { title: 'Domains/Auth/Prompt Reg' };

export function Basic() {
    return (
        <Layout>
            <Component onAccept={console.log} onAlt={console.log} />
        </Layout>
    );
}
