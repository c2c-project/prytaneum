import React from 'react';
import Container from 'layout/Container';

import Component from './DevTeam';

export default {
    title: 'Domains/DevTeam',
    component: Component,
};

export function DevTeam() {
    return (
        <Container maxWidth='lg'>
            <Component />
        </Container>
    );
}
