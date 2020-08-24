/* eslint-disable @typescript-eslint/require-await */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { AxiosResponse } from 'axios';

import RegisterForm from './RegisterForm';
import API from '../api';

jest.mock('hooks/useSnack');

describe('RegisterForm', () => {
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
            if (button) {
                button.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                );
            }
        });
        expect(spy).toBeCalled();
    });

    it('should submit and succeed', async () => {
        // setup

        // props
        const onSuccess = jest.fn();
        const onFailure = jest.fn();
        
        const resolvedVal = { status: 200 };
        const spy = jest
            .spyOn(API, 'register')
            .mockResolvedValue(resolvedVal as AxiosResponse);
        const form = {
            username: 'username',
            email: 'email@email.com',
            password: 'password',
            confirmPassword: 'password',
        };
        jest.useFakeTimers();

        // render
        ReactTestUtils.act(() => {
            render(
                <RegisterForm onSuccess={onSuccess} onFailure={onFailure} />,
                container
            );
        });

        // grab input fields from form
        const usernameNode = document.querySelector('#username') as HTMLElement;
        const emailNode = document.querySelector('#email') as HTMLElement;
        const passwordNode = document.querySelector('#password') as HTMLElement;
        const confirmNode = document.querySelector(
            '#confirm-password'
        ) as HTMLElement;
        const button = document.querySelector('[type="submit"]') as HTMLElement;

        // modify input fields in the DOM
        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(usernameNode, {
                target: ({ value: form.username } as unknown) as EventTarget,
            });
            ReactTestUtils.Simulate.change(emailNode, {
                target: ({ value: form.email } as unknown) as EventTarget,
            });
            ReactTestUtils.Simulate.change(passwordNode, {
                target: ({ value: form.password } as unknown) as EventTarget,
            });
            ReactTestUtils.Simulate.change(confirmNode, {
                target: ({ value: form.confirmPassword } as unknown) as EventTarget,
            });
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        // make sure the external API gets called 
        expect(spy).toBeCalledWith(form);
        // make sure all timers run
        jest.runAllTimers();

        // wait for any async results to resolve
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
            confirmPassword: 'password',
        };
        jest.useFakeTimers();

        ReactTestUtils.act(() => {
            render(
                <RegisterForm onSuccess={onSuccess} onFailure={onFailure} />,
                container
            );
        });

        const usernameNode = document.querySelector('#username') as HTMLElement;
        const emailNode = document.querySelector('#email') as HTMLElement;
        const passwordNode = document.querySelector('#password') as HTMLElement;
        const confirmNode = document.querySelector(
            '#confirm-password'
        ) as HTMLElement;
        const button = document.querySelector('[type="submit"]') as HTMLElement;

        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(usernameNode, {
                target: ({ value: form.username } as unknown) as EventTarget,
            });
            ReactTestUtils.Simulate.change(emailNode, {
                target: ({ value: form.email } as unknown) as EventTarget,
            });
            ReactTestUtils.Simulate.change(passwordNode, {
                target: ({ value: form.password } as unknown) as EventTarget,
            });
            ReactTestUtils.Simulate.change(confirmNode, {
                target: ({ value: form.confirmPassword } as unknown) as EventTarget,
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
