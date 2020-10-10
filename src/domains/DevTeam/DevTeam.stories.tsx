import React from 'react';
import Page from 'layout/Page';

import Component from './DevTeam';

export default {
    title: 'Domains/DevTeam',
    component: Component,
};

export function DevTeam() {
    return (
        <Page maxWidth='lg'>
            <Component />
        </Page>
    );
}
