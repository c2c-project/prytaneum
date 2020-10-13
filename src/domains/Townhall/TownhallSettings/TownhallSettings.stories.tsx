import React from 'react';

import Page from 'layout/Page';
import AppBar from 'layout/AppBar';
import TownhallProvider from '../Contexts/Townhall';
import Component from './TownhallSettings';

export default { title: 'Domains/Townhall/Townhall Settings' };

export function Basic() {
    return (
        <TownhallProvider townhallId='123'>
            <AppBar />
            <Page>
                <Component />
            </Page>
        </TownhallProvider>
    );
}
