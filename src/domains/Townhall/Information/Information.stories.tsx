import React from 'react';

import Page from 'layout/Page';
import TownhallProvider from '../Contexts/Townhall';
import Component from './Information';

export default { title: 'Domains/Townhall/Information' };

export function Basic() {
    return (
        <Page maxWidth='sm'>
            <TownhallProvider townhallId='123'>
                <Component />
            </TownhallProvider>
        </Page>
    );
}
