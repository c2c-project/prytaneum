import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { MemoryRouter, Route } from 'react-router-dom';

import Component from './LoggedIn';
import theme from 'theme';

export default {
    title: 'Components/LoggedIn',
    component: Component,
};

const path = '/';
let logout: any;

export function LoggedIn_JwtTrue() {
    return (
        <ThemeProvider theme={theme}>
            <MemoryRouter initialEntries={['/']}>
                <Route path={path}>
                    <Component jwt={true}>
                        <h1>this should be rendered</h1>
                    </Component>
                </Route>
            </MemoryRouter>
        </ThemeProvider>
    );
}

export function LoggedIn_JwtFalse() {
    return (
        <ThemeProvider theme={theme}>
            <MemoryRouter initialEntries={['/']}>
                <Route path={path} exact>
                    <Component jwt={false}>
                        <h1>This should be rendered, but console.log should say 'not redirecting'</h1>
                    </Component>
                </Route>
                <Route
                    path='/logout'
                    render={() => <h1>logout</h1>}
                />
            </MemoryRouter>
        </ThemeProvider>
    );
}
