import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import PasswordResetForm from './PasswordResetForm';
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
    it('should render', async () => {
        ReactTestUtils.act(() => {
            render(
                <PasswordResetForm onSuccess={jest.fn()} token='' />,
                container
            );
        });
    });
    it('call onSuccess appropriately after a successful submission', async () => {
        jest.useFakeTimers();
        const spy = jest.spyOn(API, 'forgotPassConsume');
        const onSuccess = jest.fn();
        ReactTestUtils.act(() => {
            render(
                <PasswordResetForm onSuccess={onSuccess} token='123' />,
                container
            );
        });
        const passNode = document.querySelector('#password');
        const confirmNode = document.querySelector('#confirm-password');
        const button = document.querySelector('[type="submit"]');

        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(passNode, {
                target: { value: '123' },
            });
            ReactTestUtils.Simulate.change(confirmNode, {
                target: { value: '123' },
            });
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        jest.runAllTimers();

        await ReactTestUtils.act(async () => {
            await Promise.allSettled(spy.mock.results);
        });

        expect(onSuccess).toBeCalled();
    });
});
