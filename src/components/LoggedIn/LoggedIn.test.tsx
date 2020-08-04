import React, { Children } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { MemoryRouter, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from 'theme';
import LoggedIn from './LoggedIn';

describe('LoggedIn', function () {
    let container: HTMLDivElement | null = null;
    const OLD_ENV = process.env;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);

        // clear module registry to clear cache of required ones
        // this is to isolate the local state so when running other tests, we do not conflict
        // https://stackoverflow.com/questions/48033841/test-process-env-with-jest
        jest.resetModules();
        process.env = { ...OLD_ENV }; // make a copy
    });

    afterEach(() => {
        // cleanup
        if (container) {
            unmountComponentAtNode(container);
            container.remove();
        }
        container = null;
        jest.restoreAllMocks();
        process.env = OLD_ENV; // restore old env
    });

    it('should render, fail, redirect to /logout', () => {
        const jwt = false;
        var pathToCheck = '/';
        let _location: any;
        ReactTestUtils.act(() => {
            render(
                <ThemeProvider theme={theme}>
                    <MemoryRouter initialEntries={['/']}>
                        <Route path={pathToCheck}>
                            <LoggedIn jwt={jwt}>
                                <h1>hi</h1>
                            </LoggedIn>
                        </Route>
                        <Route
                            path='*'
                            render={({ location }) => {
                                _location = location;
                                return null;
                            }}
                        />
                    </MemoryRouter>
                </ThemeProvider>,
                container
            );
        });
        expect(_location.pathname).toBe('/logout');
    });


    it('should render, succeed, should render to <>children</>', () => {
        const jwt = true;
        var pathToCheck = '/';
        let _location: any;
        ReactTestUtils.act(() => {
            render(
                <ThemeProvider theme={theme}>
                    <MemoryRouter initialEntries={['/']}>
                        <Route path={pathToCheck}>
                            <LoggedIn jwt={jwt}>
                                <h1 id='test'>hi</h1>
                            </LoggedIn>
                        </Route>
                        <Route
                            path='*'
                            render={({ location }) => {
                                _location = location;
                                return null;
                            }}
                        />
                    </MemoryRouter>
                </ThemeProvider>,
                container
            );
        });
        expect(_location.pathname).toBe('/');
        expect(document.getElementById('test')).toBeTruthy();
    });
});
