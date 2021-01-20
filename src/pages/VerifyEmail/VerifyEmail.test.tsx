/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import axios from 'utils/axios';
import history from 'utils/history';

import VerifyEmail from './VerifyEmail';

jest.mock('hooks/useSnack');
jest.mock('utils/axios');

describe('VerifyEmail', () => {
    let container: HTMLDivElement | null = null;

    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        // cleanup on exiting
        if (container) {
            unmountComponentAtNode(container);
            container.remove();
        }
        container = null;
        jest.restoreAllMocks();
    });

    // eslint-disable-next-line jest/expect-expect
    it('should render, verify, & go to /login', async () => {
        jest.useFakeTimers();
        const resolvedValue = { status: 200 };
        const userId = '123456';
        const historySpy = jest.spyOn(history, 'push');

        const spy = jest.spyOn(axios, 'post').mockResolvedValue(resolvedValue);
        await ReactTestUtils.act(async () => {
            render(<VerifyEmail userId={userId} />, container);
        });

        jest.runAllTimers();

        await ReactTestUtils.act(async () => {
            await Promise.allSettled(spy.mock.results);
        });

        expect(historySpy).toBeCalledWith('/login');
    });

    it('should render, fail to verify, & go to /login', async () => {
        jest.useFakeTimers();
        const resolvedValue = { status: 500 };
        const userId = '123456';
        const historySpy = jest.spyOn(history, 'push');

        const spy = jest.spyOn(axios, 'post').mockRejectedValue(resolvedValue);
        await ReactTestUtils.act(async () => {
            render(<VerifyEmail userId={userId} />, container);
        });

        jest.runAllTimers();

        await ReactTestUtils.act(async () => {
            await Promise.allSettled(spy.mock.results);
        });

        expect(historySpy).toBeCalledWith('/login');
    });
});
