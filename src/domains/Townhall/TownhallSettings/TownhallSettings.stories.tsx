import React from 'react';

import Page from 'layout/Page';
import Nav from 'layout/Nav';
import TownhallProvider from '../Contexts/Townhall';
import Component from './TownhallSettings';

export default { title: 'Domains/Townhall/Townhall Settings' };

export function Basic() {
    return (
        <TownhallProvider townhallId='123'>
            <Nav />
            <main>
                <Page>
                    <Component />
                </Page>
            </main>
        </TownhallProvider>
    );
}
