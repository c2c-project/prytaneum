/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import ForgotPassRequest from './ForgotPassRequest';
import API from '../api';

jest.mock('../../../hooks/useSnack');

describe('ForgotPassRequest', () => {
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
    it('should render', async () => {
        ReactTestUtils.act(() => {
            render(
                <ForgotPassRequest onSuccess={jest.fn()} onFailure={jest.fn()} />,
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
                <ForgotPassRequest onSuccess={onSuccess} onFailure={onFailure} />,
                container
            );
        });
        const button = document.querySelector('[type="submit"]');
        ReactTestUtils.act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        expect(spy).toBeCalled();
    });

    it('should submit and succeed', async () => {
        const onSuccess = jest.fn();
        const onFailure = jest.fn();
        const resolvedVal = { status: 200 };
        const spy = jest.spyOn(API, 'forgotPassRequest').mockResolvedValue(resolvedVal);
        jest.useFakeTimers();

        ReactTestUtils.act(() => {
            render(
                <ForgotPassRequest onSuccess={onSuccess} onFailure={onFailure} />,
                container
            );
        });

        const emailNode = document.querySelector('#email');
        const button = document.querySelector('[type="submit"]');

        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(emailNode, {
                target: { value: 'email@email.com' },
            });
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(spy).toBeCalledWith('email@email.com');
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
        const spy = jest.spyOn(API, 'forgotPassRequest').mockRejectedValue(rejectedVal);
        jest.useFakeTimers();

        ReactTestUtils.act(() => {
            render(
                <ForgotPassRequest onSuccess={onSuccess} onFailure={onFailure} />,
                container
            );
        });

        const emailNode = document.querySelector('#email');
        const button = document.querySelector('[type="submit"]');

        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(emailNode, {
                target: { value: 'email@email.com' },
            });
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(spy).toBeCalledWith('email@email.com');
        jest.runAllTimers();

        await ReactTestUtils.act(async () => {
            await Promise.allSettled(spy.mock.results);
        });

        expect(onSuccess).not.toBeCalled();
        expect(onFailure).toBeCalled();
    });
});
