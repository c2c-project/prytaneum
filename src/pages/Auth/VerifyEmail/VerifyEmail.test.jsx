import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { MemoryRouter, Route } from 'react-router-dom';

import axios from 'utils/axios';

import VerifyEmail from './VerifyEmail';

jest.mock('hooks/useSnack');
jest.mock('utils/axios');

describe('VerifyEmail', () => {
    let container = null;

    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        // cleanup on exiting
        unmountComponentAtNode(container);
        container.remove();
        container = null;
        jest.restoreAllMocks();
    });

    // eslint-disable-next-line jest/expect-expect
    it('should render, verify, & go to /login', async () => {
        let _location;
        jest.useFakeTimers();
        const resolvedValue = { status: 200 };
        const userId = '123456';

        const spy = jest.spyOn(axios, 'post').mockResolvedValue(resolvedValue);
        await ReactTestUtils.act(async () => {
            render(
                <MemoryRouter initialEntries={[`/${userId}`]}>
                    <Route path='/:userId'>
                        <VerifyEmail />
                    </Route>
                    <Route
                        path='*'
                        render={({ location }) => {
                            _location = location;
                            return null;
                        }}
                    />
                </MemoryRouter>,
                container
            );
        });

        jest.runAllTimers();

        await ReactTestUtils.act(async () => {
            await Promise.allSettled(spy.mock.results);
        });

        expect(_location.pathname).toBe('/login');
    });

    it('should render, fail to verify, & go to /login', async () => {
        let _location;
        jest.useFakeTimers();
        const resolvedValue = { status: 500 };
        const userId = '123456';

        const spy = jest.spyOn(axios, 'post').mockRejectedValue(resolvedValue);
        await ReactTestUtils.act(async () => {
            render(
                <MemoryRouter initialEntries={[`/${userId}`]}>
                    <Route path='/:userId'>
                        <VerifyEmail />
                    </Route>
                    <Route
                        path='*'
                        render={({ location }) => {
                            _location = location;
                            return null;
                        }}
                    />
                </MemoryRouter>,
                container
            );
        });

        jest.runAllTimers();

        await ReactTestUtils.act(async () => {
            await Promise.allSettled(spy.mock.results);
        });

        expect(_location.pathname).toBe('/login');
    });
});
