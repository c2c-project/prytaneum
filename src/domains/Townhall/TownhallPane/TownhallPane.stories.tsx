import React from 'react';

import Container from 'layout/Container';
import TownhallProvider from '../Contexts/Townhall';
import Component from './TownhallPane';

export default { title: 'Domains/Townhall/Townhall Pane' };

export function Basic() {
    return (
        <Container maxWidth='sm'>
            <TownhallProvider townhallId='123'>
                <Component />
            </TownhallProvider>
        </Container>
    );
}
