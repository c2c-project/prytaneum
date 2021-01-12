import React from 'react';
import { Container } from '@material-ui/core';

// import Component from '.';
import TownhallContextProvider from '../../../contexts/Townhall';

export default { title: 'Domains/Townhall/Townhall Profile' };

export function Basic() {
    return (
        <TownhallContextProvider townhallId='1234'>
            <Container maxWidth='md' disableGutters>
                <div />
            </Container>
        </TownhallContextProvider>
    );
}
