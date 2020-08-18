import React from 'react';
import Button from '@material-ui/core/Button';
import { MemoryRouter, Link } from 'react-router-dom';

import Component from '.';

export default { title: 'Routes', component: Component };

export function Routes() {
    return (
        <MemoryRouter initialEntries={['/auth']}>
            <Component />
            <Button component={Link} to='/auth/register'>
                Register
            </Button>
            <Button component={Link} to='/auth/login'>
                Login
            </Button>
            <Button component={Link} to='/auth/forgot-password'>
                Forgot Password
            </Button>
        </MemoryRouter>
    );
}
