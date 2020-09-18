import React from 'react';
import { Container } from '@material-ui/core';

import Component from '.';
import TownhallContextProvider from '../Contexts/Townhall';

export default { title: 'Domains/Townhall' };

export function TownhallProfile() {
    return (
        <TownhallContextProvider townhallId='1234'>
            <Container maxWidth='md' disableGutters>
                <Component />
            </Container>
        </TownhallContextProvider>
    );
}
