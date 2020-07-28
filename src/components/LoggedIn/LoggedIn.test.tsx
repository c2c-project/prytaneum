import React, { Children } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { MemoryRouter, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import axios from 'utils/axios';
import { shallow, mount } from "enzyme"


import theme from 'theme';
import LoggedIn from './LoggedIn';
import routeNames from '../../pages/Auth/route-names';

jest.mock('hooks/useSnack');
jest.mock('utils/axios');

describe('LoggedIn', function() {
    let container: HTMLDivElement | null = null;
    const OLD_ENV = process.env

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);

        // clear module registry to clear cache of required ones
        // this is to isolate the local state so when running other tests, we do not conflict
        // https://stackoverflow.com/questions/48033841/test-process-env-with-jest
        jest.resetModules();
        process.env = {...OLD_ENV}; // make a copy
    });

    afterEach(() =>{
        // cleanup
        if (container) {
            unmountComponentAtNode(container);
            container.remove();
        }
        container = null;
        jest.restoreAllMocks();
        process.env = OLD_ENV; // restore old env
    });
    
    it('should render', () => {
        const children = <h1>hi</h1>;
        ReactTestUtils.act(
            () => {
                render(
                    <ThemeProvider theme={theme}>
                        <MemoryRouter initialEntries={['/']}>
                            <Route path='/'>
                                <LoggedIn>
                                    <h1>test child</h1>
                                </LoggedIn>
                            </Route>
                        </MemoryRouter>
                    </ThemeProvider>,
                    container
                );
            }
        );
    });

    // https://stackoverflow.com/questions/49096093/how-do-i-test-a-jest-console-log
    // Since we cannot alter NODE_ENV to test for 'development
    // we added a console.log to LoggedIn if it gets passed the 
    // if statement, so we can test if it passed
    /*
    it('should log if redirecting NODE_ENV != development', 
        async () => {
            const consoleSpy = jest.spyOn(console, 'log');
            const resolvedValue = { status: 200 };
            jest.useFakeTimers();
            const spy = jest.spyOn(axios, 'post').mockResolvedValue(resolvedValue);
            const children = <h1>hi</h1>;
            // NODE_ENV is read-only so we cannot change it to test it?
            process.env.NODE_ENV = 'development';
            let _location: any;

            await ReactTestUtils.act(
                async () => {
                    render(
                        <ThemeProvider theme={theme}>
                            <MemoryRouter initialEntries={['/']}>
                                <Route path='*'>
                                    <LoggedIn
                                        children={children}
                                    />
                                </Route>
                            </MemoryRouter>
                        </ThemeProvider>,
                        container
                    );
                }
            );
            jest.runAllTimers();

            await ReactTestUtils.act( async () => {
                await Promise.allSettled(spy.mock.results);
            });
            console.log(_location.pathname);
            
            expect(_location.pathname).toBe(routeNames);
            //expect(consoleSpy).toHaveBeenCalledWith('redirecting');
        }
    );*/

    // this test consists of 2 parts
    // 1. renders
    // 2. checks location
    /*
    it('should redirect to /logout', () => {
        const children = <h1>hi</h1>;
        const pathToCheck = mount(
            <MemoryRouter initialEntries={['/']}>
                <Route>
                    <LoggedIn
                        children={children}
                    />
                </Route>
            </MemoryRouter>
        ); 

        expect(pathToCheck).toBe('/logout');
    });*/
});