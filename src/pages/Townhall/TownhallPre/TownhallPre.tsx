import React from 'react';
import { Container } from '@material-ui/core';

import AppBar from 'layout/AppBar';
import Component from 'domains/Townhall/TownhallPre';

export default function TownhallPre() {
    return (
        <>
            <main>
                <Container
                    maxWidth='sm'
                    style={{ width: '100%', height: '100%' }}
                    disableGutters
                >
                    <Component />
                </Container>
            </main>
        </>
    );
}
