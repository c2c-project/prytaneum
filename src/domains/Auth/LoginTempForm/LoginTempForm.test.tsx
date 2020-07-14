import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { AxiosResponse } from 'axios';

import LoginTempForm from './LoginTempForm';
import API from '../api';

jest.mock('hooks/useSnack');

describe('LoginTempForm', () => {
    let container: HTMLElement | null = null;

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
    it('should render', () => {
        ReactTestUtils.act(() => {
            render(
                <LoginTempForm onSuccess={jest.fn()} onFailure={jest.fn()} />,
                container
            );
        });
    });

    it('should submit on button click', () => {
        const onSuccess = jest.fn();
        const onFailure = jest.fn();
        const spy = jest.spyOn(API, 'loginTemp');
        ReactTestUtils.act(() => {
            render(
                <LoginTempForm onSuccess={onSuccess} onFailure={onFailure} />,
                container
            );
        });
        const button = document.querySelector(
            '[type="submit"]'
        ) as HTMLButtonElement;
        ReactTestUtils.act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        expect(spy).toBeCalled();
    });

    it('should submit and succeed', async () => {
        const onSuccess = jest.fn();
        const onFailure = jest.fn();
        const resolvedVal = { status: 200 } as AxiosResponse<any>;
        const spy = jest.spyOn(API, 'loginTemp').mockResolvedValue(resolvedVal);
        jest.useFakeTimers();

        ReactTestUtils.act(() => {
            render(
                <LoginTempForm onSuccess={onSuccess} onFailure={onFailure} />,
                container
            );
        });

        const usernameNode = document.querySelector(
            '#username'
        ) as HTMLInputElement;
        const button = document.querySelector(
            '[type="submit"]'
        ) as HTMLButtonElement;

        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(usernameNode, {
                target: { value: 'username' },
            } as any);
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(spy).toBeCalledWith('username');
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
        const spy = jest.spyOn(API, 'loginTemp').mockRejectedValue(rejectedVal);
        jest.useFakeTimers();

        ReactTestUtils.act(() => {
            render(
                <LoginTempForm onSuccess={onSuccess} onFailure={onFailure} />,
                container
            );
        });

        const usernameNode = document.querySelector(
            '#username'
        ) as HTMLInputElement;
        const button = document.querySelector(
            '[type="submit"]'
        ) as HTMLButtonElement;

        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(usernameNode, {
                target: { value: 'username' },
            } as any);
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(spy).toBeCalledWith('username');
        jest.runAllTimers();

        await ReactTestUtils.act(async () => {
            await Promise.allSettled(spy.mock.results);
        });

        expect(onSuccess).not.toBeCalled();
        expect(onFailure).toBeCalled();
    });
});
