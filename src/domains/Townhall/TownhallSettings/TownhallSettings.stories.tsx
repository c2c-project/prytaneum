import React from 'react';

import Page from 'layout/Page';
import Container from 'layout/Container';
import Nav from 'layout/Nav';
import TownhallProvider from '../Contexts/Townhall';
import Component from './TownhallSettings';

export default { title: 'Domains/Townhall/Townhall Settings' };

export function Basic() {
    return (
        <TownhallProvider townhallId='123'>
            <Page>
                <Nav />
                <Container>
                    <Component />
                </Container>
            </Page>
        </TownhallProvider>
    );
}
