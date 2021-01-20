/* eslint-disable @typescript-eslint/require-await */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { AxiosResponse } from 'axios';

import ForgotPassRequest from './ForgotPassRequest';
import API from '../api';

jest.mock('hooks/useSnack');

describe('ForgotPassRequest', () => {
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
    it('should render', async () => {
        ReactTestUtils.act(() => {
            render(
                <ForgotPassRequest
                    onSuccess={jest.fn()}
                    onFailure={jest.fn()}
                />,
                container
            );
        });
    });

    it('should submit on button click', async () => {
        const onSuccess = jest.fn();
        const onFailure = jest.fn();
        const spy = jest.spyOn(API, 'forgotPassRequest');
        ReactTestUtils.act(() => {
            render(
                <ForgotPassRequest
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                />,
                container
            );
        });
        const email = document.querySelector('#email') as HTMLElement;
        const button = document.querySelector('[type="submit"]') as HTMLElement;
        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(email, {
                target: ({ value: 'not null' } as unknown) as EventTarget,
            });
        });

        ReactTestUtils.act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        expect(spy).toBeCalled();
    });

    it('should submit and succeed', async () => {
        const onSuccess = jest.fn();
        const onFailure = jest.fn();
        const resolvedVal: AxiosResponse = {
            status: 200,
            data: {},
            statusText: 'OK',
            headers: {},
            config: {},
        };
        const spy = jest
            .spyOn(API, 'forgotPassRequest')
            .mockResolvedValue(resolvedVal);
        jest.useFakeTimers();

        ReactTestUtils.act(() => {
            render(
                <ForgotPassRequest
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                />,
                container
            );
        });

        const emailNode = document.querySelector('#email') as HTMLElement;
        const button = document.querySelector('[type="submit"]') as HTMLElement;

        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(emailNode, {
                target: { value: 'email@email.com' },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any);
        });

        ReactTestUtils.act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(spy).toBeCalledWith({ email: 'email@email.com' });
        jest.runAllTimers();

        await ReactTestUtils.act(async () => {
            await Promise.allSettled(spy.mock.results);
        });

        expect(onSuccess).toBeCalled();
        expect(onFailure).not.toBeCalled();
    });

    it('should submit and fail', async () => {
        const onSuccess = jest.fn();
        const onFailure = jest.fn();
        const rejectedVal = { status: 500 };
        const spy = jest
            .spyOn(API, 'forgotPassRequest')
            .mockRejectedValue(rejectedVal);
        jest.useFakeTimers();

        ReactTestUtils.act(() => {
            render(
                <ForgotPassRequest
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                />,
                container
            );
        });

        const emailNode = document.querySelector('#email') as HTMLElement;
        const button = document.querySelector('[type="submit"]') as HTMLElement;
        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(emailNode, {
                target: ({
                    value: 'email@email.com',
                } as unknown) as EventTarget,
            });
        });

        ReactTestUtils.act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(spy).toBeCalledWith({ email: 'email@email.com' });
        jest.runAllTimers();

        await ReactTestUtils.act(async () => {
            await Promise.allSettled(spy.mock.results);
        });

        expect(onSuccess).not.toBeCalled();
        expect(onFailure).toBeCalled();
    });
});
