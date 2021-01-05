import React from 'react';

import Page from 'layout/Page';
import Main from 'layout/Main';
import AppBar from 'layout/AppBar';
import TownhallProvider from '../../../contexts/Townhall';
import Component from './TownhallSettings';

export default { title: 'Domains/Townhall/Townhall Settings' };

export function Basic() {
    return (
        <TownhallProvider townhallId='123'>
            <Page>
                <AppBar />
                <Main>
                    <Component />
                </Main>
            </Page>
        </TownhallProvider>
    );
}
