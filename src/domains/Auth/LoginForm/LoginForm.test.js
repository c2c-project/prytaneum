/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import LoginForm from './LoginForm';
import API from '../api';

jest.mock('../../../hooks/useSnack');

describe('LoginForm', () => {
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
    it('should render', () => {
        ReactTestUtils.act(() => {
            render(<LoginForm afterSubmit={jest.fn()} />, container);
        });
    });

    it('should change state appropriately', () => {
        // initial render
        ReactTestUtils.act(() => {
            render(<LoginForm afterSubmit={jest.fn()} />, container);
        });

        // find fields
        const usernameNode = document.querySelector('#username');
        const passwordNode = document.querySelector('#password');

        // expect them to be initially empty
        expect(usernameNode.value).toBe('');
        expect(passwordNode.value).toBe('');

        // change the fields
        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(usernameNode, {
                target: { value: 'username' },
            });
            ReactTestUtils.Simulate.change(passwordNode, {
                target: { value: 'password' },
            });
        });

        // expect them to reflect the changed values
        expect(passwordNode.value).toBe('password');
        expect(usernameNode.value).toBe('username');
    });

    it('should call handleSubmit & afterSubmit appropriately', async () => {
        const afterSubmit = jest.fn();
        const resolveVal = { status: 200 };
        const loginSpy = jest
            .spyOn(API, 'login')
            .mockResolvedValue(resolveVal);
        jest.useFakeTimers();

        // initial render
        ReactTestUtils.act(() => {
            render(<LoginForm afterSubmit={afterSubmit} />, container);
        });

        const button = document.querySelector('[type="submit"]');

        // click button
        ReactTestUtils.act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        /*
            After clicking the button
            1. login request is called
            2. aftersubmit is waiting for login to resolve
         */
        expect(afterSubmit).not.toBeCalled();
        expect(API.login).toBeCalledWith('', '');
        jest.runAllTimers();

        // let useEffect handle changes due to login request resolving
        await ReactTestUtils.act(async () => {
            await loginSpy.mock.results.pop().value;
        });

        // login should only get called once & afterSubmit should get called
        expect(API.login).toBeCalledTimes(1);
        expect(afterSubmit).toBeCalled();
    });

    it('should fail in calling afterSubmit if status is not 200', async () => {
        const afterSubmit = jest.fn();
        const resolveVal = { status: 500 };
        const loginSpy = jest
            .spyOn(API, 'login')
            .mockResolvedValue(resolveVal);
        jest.useFakeTimers();

        // initial render
        ReactTestUtils.act(() => {
            render(<LoginForm afterSubmit={afterSubmit} />, container);
        });

        const button = document.querySelector('[type="submit"]');

        // click button
        ReactTestUtils.act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        /*
            After clicking the button
            1. login request is called
            2. aftersubmit is waiting for login to resolve
         */
        expect(afterSubmit).not.toBeCalled();
        expect(API.login).toBeCalledWith('', '');
        jest.runAllTimers();

        // let useEffect handle changes due to login request resolving
        await ReactTestUtils.act(async () => {
            await loginSpy.mock.results.pop().value;
        });

        // login should only get called once & afterSubmit should not be called
        expect(API.login).toBeCalledTimes(1);
        expect(afterSubmit).not.toBeCalled();
    });
});
