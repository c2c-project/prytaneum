/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { MemoryRouter, Route } from 'react-router-dom';

import ForgotPassConsume from './ForgotPassConsume';
import API from '../api';

jest.mock('hooks/useSnack');
jest.mock('utils/axios');

describe('ForgotPassConsume', () => {
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

        // jest.spyOn(axios, 'post').mockResolvedValue(resolvedValue);
        const verifyEmailSpy = jest
            .spyOn(API, 'verifyEmail')
            .mockResolvedValue(resolvedValue);
        await ReactTestUtils.act(async () => {
            render(
                <MemoryRouter initialEntries={[`/${userId}`]}>
                    <Route path='/:userId'>
                        <ForgotPassConsume />
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

        expect(API.verifyEmail).toBeCalledWith(userId);
        jest.runAllTimers();

        await ReactTestUtils.act(async () => {
            await verifyEmailSpy.mock.results.pop().value;
        });

        expect(_location.pathname).toBe('/login');
    });

    it('should render, error, & go to /login', async () => {
        let _location;
        jest.useFakeTimers();
        const resolvedValue = { status: 400 };
        const userId = '123456';

        // jest.spyOn(axios, 'post').mockResolvedValue(resolvedValue);
        const verifyEmailSpy = jest
            .spyOn(API, 'verifyEmail')
            .mockResolvedValue(resolvedValue);
        await ReactTestUtils.act(async () => {
            render(
                <MemoryRouter initialEntries={[`/${userId}`]}>
                    <Route path='/:userId'>
                        <ForgotPassConsume />
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

        expect(API.verifyEmail).toBeCalledWith(userId);
        jest.runAllTimers();

        await ReactTestUtils.act(async () => {
            await verifyEmailSpy.mock.results.pop().value;
        });

        expect(_location.pathname).toBe('/login');
    });
});
