import React from 'react';
import Button from '@material-ui/core/Button';
import { MemoryRouter, Link } from 'react-router-dom';

import Component from './Routes';

export default { title: 'What', component: Component };

export function Routes() {
    return (
        <MemoryRouter initialEntries={['/townhalls']}>
            <Component />
            <Button component={Link} to='/townhalls/id/123'>
                Go To Specific Townhall
            </Button>
            <Button component={Link} to='/townhalls/list'>
                Go To Specific Townhall
            </Button>
        </MemoryRouter>
    );
}
