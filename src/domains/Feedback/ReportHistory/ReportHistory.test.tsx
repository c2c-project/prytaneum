/* eslint-disable @typescript-eslint/require-await */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { AxiosResponse } from 'axios';

import ReportHistory from './ReportHistory';
import * as API from '../api/api';

jest.mock('hooks/useSnack');

// TODO: Auth. Mock user Ids
describe('CreateReportList', () => {
    let container: HTMLDivElement | null = null;
    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        if (container) {
            unmountComponentAtNode(container);
            container.remove();
        }
        container = null;
        jest.restoreAllMocks();
    });

    // eslint-disable-next-line jest/expect-expect
    it('should render report history', async () => {
        ReactTestUtils.act(() => {
            render(<ReportHistory />, container);
        });
    });

    it('should submit get feedback reports request', async () => {
        const resolvedVal: AxiosResponse = {
            status: 200,
            data: {},
            statusText: 'OK',
            headers: {},
            config: {},
        };
        const spy = jest
            .spyOn(API, 'getFeedbackReportsBySubmitter')
            .mockResolvedValue(resolvedVal);
        jest.useFakeTimers();

        ReactTestUtils.act(() => {
            render(<ReportHistory />, container);
        });

        const submitButton = document.querySelector(
            '[type="submit"]'
        ) as HTMLButtonElement;

        ReactTestUtils.act(() => {
            submitButton.dispatchEvent(
                new MouseEvent('click', { bubbles: true })
            );
        });

        expect(spy).toBeCalledWith(1, '', '123456789');
        jest.runAllTimers();

        await ReactTestUtils.act(async () => {
            await Promise.allSettled(spy.mock.results);
        });
    });

    it('should attempt to submit get feedback reports request and fail', async () => {
        const rejectedVal = {
            status: 500,
        };
        const spy = jest
            .spyOn(API, 'getFeedbackReportsBySubmitter')
            .mockRejectedValue(rejectedVal);
        jest.useFakeTimers();

        ReactTestUtils.act(() => {
            render(<ReportHistory />, container);
        });

        const submitButton = document.querySelector(
            '[type="submit"]'
        ) as HTMLButtonElement;

        ReactTestUtils.act(() => {
            submitButton.dispatchEvent(
                new MouseEvent('click', { bubbles: true })
            );
        });

        expect(spy).toBeCalledWith(1, '', '123456789');
        jest.runAllTimers();

        await ReactTestUtils.act(async () => {
            await Promise.allSettled(spy.mock.results);
        });
    });
});
