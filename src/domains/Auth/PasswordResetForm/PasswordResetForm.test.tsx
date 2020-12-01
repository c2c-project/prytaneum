import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import PasswordResetForm from './PasswordResetForm';
import API from '../api';

jest.mock('hooks/useSnack');
jest.mock('utils/axios');

describe('ForgotPassConsume', () => {
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
                <PasswordResetForm onSuccess={jest.fn()} token='' />,
                container
            );
        });
    });
    it('call onSuccess appropriately after a successful submission', async () => {
        jest.useFakeTimers();
        const spy = jest.spyOn(API, 'forgotPassReset');
        const onSuccess = jest.fn();
        ReactTestUtils.act(() => {
            render(
                <PasswordResetForm onSuccess={onSuccess} token='123' />,
                container
            );
        });
        const passNode = document.querySelector(
            '#password'
        ) as HTMLInputElement;
        const confirmNode = document.querySelector(
            '#confirm-password'
        ) as HTMLInputElement;
        const button = document.querySelector(
            '[type="submit"]'
        ) as HTMLButtonElement;

        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(passNode, {
                target: ({ value: '123' } as unknown) as EventTarget,
            });
        });
        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(confirmNode, {
                target: ({ value: '123' } as unknown) as EventTarget,
            });
        });
        ReactTestUtils.act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        jest.runAllTimers();

        await ReactTestUtils.act(async () => {
            await Promise.allSettled(spy.mock.results);
        });

        expect(onSuccess).toBeCalled();
    });
});
