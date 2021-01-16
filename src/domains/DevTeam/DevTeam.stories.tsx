import React from 'react';
import Main from 'layout/Main';

import Component from './DevTeam';

export default {
    title: 'Domains/DevTeam',
    component: Component,
};

export function DevTeam() {
    return (
        <Main maxWidth='lg'>
            <Component />
        </Main>
    );
}
