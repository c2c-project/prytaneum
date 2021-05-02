import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { AxiosResponse } from 'axios';
import UserProvider from 'contexts/User';
import { makeUser, User } from 'prytaneum-typings';

import LoginForm from './LoginForm';
import API from '../api';

jest.mock('hooks/useSnack');

describe('LoginForm', () => {
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
                <UserProvider forceNoLogin value={makeUser()}>
                    <LoginForm onSuccess={jest.fn()} />
                </UserProvider>,
                container
            );
        });
    });

    it('should change state appropriately', () => {
        // initial render
        ReactTestUtils.act(() => {
            render(
                <UserProvider forceNoLogin value={makeUser()}>
                    <LoginForm onSuccess={jest.fn()} />
                </UserProvider>,
                container
            );
        });

        // find fields
        const emailNode = document.querySelector(
            '#login-email'
        ) as HTMLInputElement;
        const passwordNode = document.querySelector(
            '#login-password'
        ) as HTMLInputElement;

        // expect them to be initially empty
        expect(emailNode.value).toBe('');
        expect(passwordNode.value).toBe('');

        // change the fields
        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(emailNode, {
                target: ({
                    value: 'email',
                } as unknown) as EventTarget,
            });
        });

        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(passwordNode, {
                target: ({
                    value: 'password',
                } as unknown) as EventTarget,
            });
        });

        // expect them to reflect the changed values
        expect(passwordNode.value).toBe('password');
        // console.log(emailNode);
        expect(emailNode.value).toBe('email');
    });

    it('should call handleSubmit & onSuccess appropriately', async () => {
        const onSuccess = jest.fn();
        const resolveVal = {
            status: 200,
            data: { user: makeUser() },
        } as AxiosResponse<{
            user: User;
        }>;
        const loginSpy = jest.spyOn(API, 'login').mockResolvedValue(resolveVal);
        jest.useFakeTimers();

        // initial render
        ReactTestUtils.act(() => {
            render(
                <UserProvider forceNoLogin value={makeUser()}>
                    <LoginForm onSuccess={onSuccess} />
                </UserProvider>,
                container
            );
        });

        const emailNode = document.querySelector(
            '#login-email'
        ) as HTMLInputElement;
        const passwordNode = document.querySelector(
            '#login-password'
        ) as HTMLInputElement;
        const button = document.querySelector(
            '[type="submit"]'
        ) as HTMLButtonElement;

        // change the fields
        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(emailNode, {
                target: ({
                    value: 'email@email.com',
                } as unknown) as EventTarget,
            });
        });

        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(passwordNode, {
                target: ({
                    value: 'password',
                } as unknown) as EventTarget,
            });
        });

        // click button
        ReactTestUtils.act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        /*
            After clicking the button
            1. login request is called
            2. onSuccess is waiting for login to resolve
         */
        expect(onSuccess).not.toBeCalled();
        expect(API.login).toBeCalledWith('email@email.com', 'password');

        jest.runAllTimers();
        // let useEffect handle changes due to login request resolving
        await ReactTestUtils.act(async () => {
            await Promise.allSettled(loginSpy.mock.results);
        });

        // login should only get called once & onSuccess should get called
        expect(API.login).toBeCalledTimes(1);
        expect(onSuccess).toBeCalled();
    });

    it('should fail in calling onSuccess if status is not 2xx', async () => {
        const onSuccess = jest.fn();
        const rejectedVal = { status: 500 };
        const loginSpy = jest
            .spyOn(API, 'login')
            .mockRejectedValue(rejectedVal);
        jest.useFakeTimers();

        // initial render
        ReactTestUtils.act(() => {
            render(
                <UserProvider forceNoLogin value={makeUser()}>
                    <LoginForm onSuccess={onSuccess} />
                </UserProvider>,
                container
            );
        });

        // find fields
        const emailNode = document.querySelector(
            '#login-email'
        ) as HTMLInputElement;
        const passwordNode = document.querySelector(
            '#login-password'
        ) as HTMLInputElement;
        const button = document.querySelector(
            '[type="submit"]'
        ) as HTMLButtonElement;

        // change the fields
        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(emailNode, {
                target: ({
                    value: 'email@email.com',
                } as unknown) as EventTarget,
            });
        });

        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(passwordNode, {
                target: ({ value: 'password' } as unknown) as EventTarget,
            });
        });

        ReactTestUtils.act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        /*
            After clicking the button
            1. login request is called
            2. onSuccess is waiting for login to resolve
         */
        expect(onSuccess).not.toBeCalled();
        expect(API.login).toBeCalledWith('email@email.com', 'password');
        jest.runAllTimers();

        // let useEffect handle changes due to login request resolving
        await ReactTestUtils.act(async () => {
            await Promise.allSettled(loginSpy.mock.results);
        });

        // login should only get called once & onSuccess should not be called
        expect(API.login).toBeCalledTimes(1);
        expect(onSuccess).not.toBeCalled();
    });
});
