import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';

import Component from './LoggedIn';

export default {
    title: 'Components/LoggedIn',
    component: Component,
};

const path = '/';

export function LoggedIn_JwtTrue() {
    return (
        <MemoryRouter initialEntries={['/']}>
            <Route path={path}>
                <Component jwt>
                    <h1>this should be rendered</h1>
                </Component>
            </Route>
        </MemoryRouter>
    );
}

export function LoggedIn_JwtFalse() {
    return (
        <MemoryRouter initialEntries={['/']}>
            <Route path={path} exact>
                <Component jwt={false}>
                    <h1>
                        This should be rendered, but console.log should say
                        &quotnot redirecting&quot
                    </h1>
                </Component>
            </Route>
            <Route path='/logout' render={() => <h1>logout</h1>} />
        </MemoryRouter>
    );
}
