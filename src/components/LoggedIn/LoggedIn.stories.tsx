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
let _location: any;

export function LoggedIn_JwtTrue() {
    return (
        <ThemeProvider theme={theme}>
            <MemoryRouter initialEntries={['/']}>
                <Route path={path}>
                    <Component jwt={true}>
                        <h1>this should be rendered</h1>
                    </Component>
                </Route>
                <Route
                    path='*'
                    render={({ location }) => {
                        _location = location;
                        return null;
                    }}
                />
            </MemoryRouter>
        </ThemeProvider>
    );
}

export function LoggedIn_JwtFalse() {
    return (
        <ThemeProvider theme={theme}>
            <MemoryRouter initialEntries={['/']}>
                <Route path={path}>
                    <Component jwt={false}>
                        <h1>This should not be rendered</h1>
                    </Component>
                </Route>
                <Route
                    path='*'
                    render={({ location }) => {
                        _location = location;
                        return null;
                    }}
                />
            </MemoryRouter>
        </ThemeProvider>
    );
}
