/* eslint-disable @typescript-eslint/require-await */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { AxiosResponse } from 'axios';
import { makeUser } from 'prytaneum-typings';

import UserProvider from 'contexts/User';
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
                <UserProvider forceNoLogin value={makeUser()}>
                    <RegisterForm onSuccess={jest.fn()} onFailure={jest.fn()} />
                </UserProvider>,
                container
            );
        });
    });

    it('should submit and succeed', async () => {
        // setup

        // props
        const onSuccess = jest.fn();
        const onFailure = jest.fn();

        const resolvedVal: AxiosResponse = {
            status: 200,
            data: { user: makeUser() },
            statusText: '',
            headers: {},
            config: {},
        };
        const spy = jest.spyOn(API, 'register').mockResolvedValue(resolvedVal);
        const form = {
            email: 'email@email.com',
            password: 'password',
            confirmPassword: 'password',
            firstName: 'name',
            lastName: 'lastname',
        };
        jest.useFakeTimers();

        // render
        ReactTestUtils.act(() => {
            render(
                <UserProvider forceNoLogin value={makeUser()}>
                    <RegisterForm onSuccess={onSuccess} onFailure={onFailure} />
                </UserProvider>,
                container
            );
        });

        const emailNode = document.querySelector(
            '#register-email'
        ) as HTMLElement;
        const passwordNode = document.querySelector(
            '#register-password'
        ) as HTMLElement;
        const confirmNode = document.querySelector(
            '#register-confirm-password'
        ) as HTMLElement;
        const firstnameNode = document.querySelector(
            '#register-first-name'
        ) as HTMLElement;
        const lastNameNode = document.querySelector(
            '#register-last-name'
        ) as HTMLElement;
        const button = document.querySelector('[type="submit"]') as HTMLElement;

        // modify input fields in the DOM
        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(emailNode, {
                target: ({ value: form.email } as unknown) as EventTarget,
            });
        });
        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(passwordNode, {
                target: ({ value: form.password } as unknown) as EventTarget,
            });
        });
        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(confirmNode, {
                target: ({
                    value: form.confirmPassword,
                } as unknown) as EventTarget,
            });
        });
        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(firstnameNode, {
                target: ({
                    value: form.firstName,
                } as unknown) as EventTarget,
            });
        });
        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(lastNameNode, {
                target: ({
                    value: form.lastName,
                } as unknown) as EventTarget,
            });
        });
        ReactTestUtils.act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        // make sure the external API gets called
        expect(spy).toBeCalledWith(form, undefined);
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
            email: 'email@email.com',
            password: 'password',
            confirmPassword: 'password',
            firstName: 'name',
            lastName: 'lastname',
        };
        jest.useFakeTimers();

        ReactTestUtils.act(() => {
            render(
                <UserProvider forceNoLogin value={makeUser()}>
                    <RegisterForm onSuccess={onSuccess} onFailure={onFailure} />
                </UserProvider>,
                container
            );
        });

        const emailNode = document.querySelector(
            '#register-email'
        ) as HTMLElement;
        const passwordNode = document.querySelector(
            '#register-password'
        ) as HTMLElement;
        const confirmNode = document.querySelector(
            '#register-confirm-password'
        ) as HTMLElement;
        const firstnameNode = document.querySelector(
            '#register-first-name'
        ) as HTMLElement;
        const lastNameNode = document.querySelector(
            '#register-last-name'
        ) as HTMLElement;
        const button = document.querySelector('[type="submit"]') as HTMLElement;

        // modify input fields in the DOM
        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(emailNode, {
                target: ({ value: form.email } as unknown) as EventTarget,
            });
        });
        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(passwordNode, {
                target: ({ value: form.password } as unknown) as EventTarget,
            });
        });
        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(confirmNode, {
                target: ({
                    value: form.confirmPassword,
                } as unknown) as EventTarget,
            });
        });
        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(firstnameNode, {
                target: ({
                    value: form.firstName,
                } as unknown) as EventTarget,
            });
        });
        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(lastNameNode, {
                target: ({
                    value: form.lastName,
                } as unknown) as EventTarget,
            });
        });
        ReactTestUtils.act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(spy).toBeCalledWith(form, undefined);
        jest.runAllTimers();

        await ReactTestUtils.act(async () => {
            await Promise.allSettled(spy.mock.results);
        });

        expect(onSuccess).not.toBeCalled();
        expect(onFailure).toBeCalled();
    });
});
