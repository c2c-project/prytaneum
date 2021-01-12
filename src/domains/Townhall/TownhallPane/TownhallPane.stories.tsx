import React from 'react';

import Main from 'layout/Main';
import TownhallProvider from '../../../contexts/Townhall';
import Component from './TownhallPane';

export default { title: 'Domains/Townhall/Townhall Pane' };

export function Basic() {
    return (
        <Main maxWidth='sm'>
            <TownhallProvider townhallId='123'>
                <Component />
            </TownhallProvider>
        </Main>
    );
}
