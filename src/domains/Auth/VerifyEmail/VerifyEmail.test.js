/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import VerifyEmail from './VerifyEmail';
import API from '../api';
// import axios from '../../../utils/axios';

jest.mock('../../../hooks/useSnack');
jest.mock('../../../utils/axios');

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
    it('should render, verify, & call onSuccess', async () => {
        jest.useFakeTimers();
        const resolvedValue = { status: 200 };
        const userId = '123456';
        const onSuccess = jest.fn();

        // jest.spyOn(axios, 'post').mockResolvedValue(resolvedValue);
        const verifyEmailSpy = jest
            .spyOn(API, 'verifyEmail')
            .mockResolvedValue(resolvedValue);

        await ReactTestUtils.act(async () => {
            render(
                <VerifyEmail
                    onFailure={jest.fn()}
                    onSuccess={onSuccess}
                    userId={userId}
                />,
                container
            );
        });

        expect(API.verifyEmail).toBeCalledWith(userId);
        jest.runAllTimers();

        await ReactTestUtils.act(async () => {
            await verifyEmailSpy.mock.results.pop().value;
        });

        expect(onSuccess).toBeCalledTimes(1);
    });

    it('should render, error, & call onFailure', async () => {
        jest.useFakeTimers();
        const resolvedValue = { status: 400 };
        const userId = '123456';
        const onFailure = jest.fn();

        // jest.spyOn(axios, 'post').mockResolvedValue(resolvedValue);
        const verifyEmailSpy = jest
            .spyOn(API, 'verifyEmail')
            .mockRejectedValue(resolvedValue);
        await ReactTestUtils.act(async () => {
            render(
                <VerifyEmail
                    onFailure={onFailure}
                    onSuccess={jest.fn()}
                    userId={userId}
                />,
                container
            );
        });

        expect(API.verifyEmail).toBeCalledWith(userId);
        jest.runAllTimers();

        await ReactTestUtils.act(async () => {
            await Promise.allSettled(verifyEmailSpy.mock.results);
        });

        expect(onFailure).toBeCalledTimes(1);
    });

    it('fail with falsy userId', async () => {
        jest.useFakeTimers();
        const onFailure = jest.fn();

        const verifyEmailSpy = jest.spyOn(API, 'verifyEmail');
        await ReactTestUtils.act(async () => {
            render(
                <VerifyEmail
                    onFailure={onFailure}
                    onSuccess={jest.fn()}
                    userId=''
                />,
                container
            );
        });

        expect(API.verifyEmail).toBeCalledWith('');
        jest.runAllTimers();

        await ReactTestUtils.act(async () => {
            await Promise.allSettled(verifyEmailSpy.mock.results);
        });

        expect(onFailure).toBeCalled();
    });
});
