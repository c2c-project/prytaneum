import React from 'react';
import { Container } from '@material-ui/core';

import List from 'domains/Townhall/TownhallList';
import AppBar from 'layout/AppBar';

export default function TownhallList() {
    return (
        <>
            <AppBar />
            <main>
                <Container
                    maxWidth='md'
                    style={{ width: '100%', height: '100%' }}
                    disableGutters
                >
                    <List />
                </Container>
            </main>
        </>
    );
}
