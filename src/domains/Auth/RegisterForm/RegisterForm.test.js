/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import RegisterForm from './RegisterForm';
import API from '../api';

jest.mock('../../../hooks/useSnack');

describe('RegisterForm', () => {
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
                <RegisterForm onSuccess={jest.fn()} onFailure={jest.fn()} />,
                container
            );
        });
    });

    it('should submit on button click', async () => {
        const onSuccess = jest.fn();
        const onFailure = jest.fn();
        const spy = jest.spyOn(API, 'register');
        ReactTestUtils.act(() => {
            render(
                <RegisterForm onSuccess={onSuccess} onFailure={onFailure} />,
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
        const spy = jest.spyOn(API, 'register').mockResolvedValue(resolvedVal);
        const form = {
            username: 'username',
            email: 'email@email.com',
            password: 'password',
            confirmPass: 'password'
        }
        jest.useFakeTimers();

        ReactTestUtils.act(() => {
            render(
                <RegisterForm onSuccess={onSuccess} onFailure={onFailure} />,
                container
            );
        });

        const usernameNode = document.querySelector('#username');
        const emailNode = document.querySelector('#email');
        const passwordNode = document.querySelector('#password');
        const confirmNode = document.querySelector('#confirm-password');
        const button = document.querySelector('[type="submit"]');

        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(usernameNode, {
                target: { value: form.username },
            });
            ReactTestUtils.Simulate.change(emailNode, {
                target: { value: form.email },
            });
            ReactTestUtils.Simulate.change(passwordNode, {
                target: { value: form.password },
            });
            ReactTestUtils.Simulate.change(confirmNode, {
                target: { value: form.confirmPass },
            });
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(spy).toBeCalledWith(form);
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
        const spy = jest.spyOn(API, 'register').mockRejectedValue(rejectedVal);       
        const form = {
            username: 'username',
            email: 'email@email.com',
            password: 'password',
            confirmPass: 'password'
        }
        jest.useFakeTimers();
        
        ReactTestUtils.act(() => {
            render(
                <RegisterForm onSuccess={onSuccess} onFailure={onFailure} />,
                container
            );
        });

        const usernameNode = document.querySelector('#username');
        const emailNode = document.querySelector('#email');
        const passwordNode = document.querySelector('#password');
        const confirmNode = document.querySelector('#confirm-password');
        const button = document.querySelector('[type="submit"]');

        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(usernameNode, {
                target: { value: form.username },
            });
            ReactTestUtils.Simulate.change(emailNode, {
                target: { value: form.email },
            });
            ReactTestUtils.Simulate.change(passwordNode, {
                target: { value: form.password },
            });
            ReactTestUtils.Simulate.change(confirmNode, {
                target: { value: form.confirmPass },
            });
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(spy).toBeCalledWith(form);
        jest.runAllTimers();

        await ReactTestUtils.act(async () => {
            await Promise.allSettled(spy.mock.results);
        });

        expect(onSuccess).not.toBeCalled();
        expect(onFailure).toBeCalled();
    });
});
