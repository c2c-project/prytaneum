import React from 'react';

import Page from 'layout/Page';
import AppBar from 'layout/AppBar';
import Component from './TownhallSettings';

export default { title: 'Domains/Townhall/Townhall Settings' };

export function Basic() {
    return (
        <>
            <AppBar />
            <Page>
                <Component />
            </Page>
        </>
    );
}
