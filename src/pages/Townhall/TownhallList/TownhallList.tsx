import React from 'react';
import { Container } from '@material-ui/core';

import List from 'domains/Townhall/TownhallList';

export default function TownhallList() {
    return (
        <Container maxWidth='md'>
            <List />
        </Container>
    );
}
