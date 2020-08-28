/* eslint-disable @typescript-eslint/require-await */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { AxiosResponse } from 'axios';

import ReportHistory from './ReportHistory';
import * as API from '../api/api';

jest.mock('hooks/useSnack');

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

    it('should change report type to feedback', async () => {
        ReactTestUtils.act(() => {
            render(<ReportHistory />, container);
        });

        const reportSelector = document.querySelector(
            '#reportSelector'
        ) as HTMLSelectElement;

        expect(reportSelector.value).toBe('');

        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(reportSelector, {
                target: ({ value: 'Feedback' } as unknown) as EventTarget,
            });
        });

        expect(reportSelector.value).toBe('Feedback');
    });

    it('should change report type to bug', async () => {
        ReactTestUtils.act(() => {
            render(<ReportHistory />, container);
        });

        const reportSelector = document.querySelector(
            '#reportSelector'
        ) as HTMLSelectElement;

        expect(reportSelector.value).toBe('');

        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(reportSelector, {
                target: ({ value: 'Bug' } as unknown) as EventTarget,
            });
        });

        expect(reportSelector.value).toBe('Bug');
    });

    it('should change sorting order to ascending', async () => {
        ReactTestUtils.act(() => {
            render(<ReportHistory />, container);
        });

        const sortingSelector = document.querySelector(
            '#sortingSelector'
        ) as HTMLSelectElement;

        expect(sortingSelector.value).toBe('');

        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(sortingSelector, {
                target: ({ value: 'true' } as unknown) as EventTarget,
            });
        });

        expect(sortingSelector.value).toBe('true');
    });

    it('should change sorting order to descending', async () => {
        ReactTestUtils.act(() => {
            render(<ReportHistory />, container);
        });

        const sortingSelector = document.querySelector(
            '#sortingSelector'
        ) as HTMLSelectElement;

        expect(sortingSelector.value).toBe('');

        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(sortingSelector, {
                target: ({ value: 'false' } as unknown) as EventTarget,
            });
        });

        expect(sortingSelector.value).toBe('false');
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

        const reportSelector = document.querySelector(
            '#reportSelector'
        ) as HTMLSelectElement;
        expect(reportSelector.value).toBe('');
        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(reportSelector, {
                target: ({ value: 'Feedback' } as unknown) as EventTarget,
            });
        });
        expect(reportSelector.value).toBe('Feedback');

        const sortingSelector = document.querySelector(
            '#sortingSelector'
        ) as HTMLSelectElement;
        expect(sortingSelector.value).toBe('');
        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(sortingSelector, {
                target: ({ value: 'true' } as unknown) as EventTarget,
            });
        });
        expect(sortingSelector.value).toBe('true');

        const submitButton = document.querySelector(
            '[type="submit"]'
        ) as HTMLButtonElement;

        ReactTestUtils.act(() => {
            submitButton.dispatchEvent(
                new MouseEvent('click', { bubbles: true })
            );
        });

        expect(spy).toBeCalledWith(1, 'true', '123456789');
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

        const reportSelector = document.querySelector(
            '#reportSelector'
        ) as HTMLSelectElement;
        expect(reportSelector.value).toBe('');
        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(reportSelector, {
                target: ({ value: 'Feedback' } as unknown) as EventTarget,
            });
        });
        expect(reportSelector.value).toBe('Feedback');

        const sortingSelector = document.querySelector(
            '#sortingSelector'
        ) as HTMLSelectElement;
        expect(sortingSelector.value).toBe('');
        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(sortingSelector, {
                target: ({ value: 'false' } as unknown) as EventTarget,
            });
        });
        expect(sortingSelector.value).toBe('false');

        const submitButton = document.querySelector(
            '[type="submit"]'
        ) as HTMLButtonElement;

        ReactTestUtils.act(() => {
            submitButton.dispatchEvent(
                new MouseEvent('click', { bubbles: true })
            );
        });

        expect(spy).toBeCalledWith(1, 'false', '123456789');
        jest.runAllTimers();

        await ReactTestUtils.act(async () => {
            await Promise.allSettled(spy.mock.results);
        });
    });

    it('should submit get bug reports request', async () => {
        const resolvedVal: AxiosResponse = {
            status: 200,
            data: {},
            statusText: 'OK',
            headers: {},
            config: {},
        };
        const spy = jest
            .spyOn(API, 'getBugReportsBySubmitter')
            .mockResolvedValue(resolvedVal);
        jest.useFakeTimers();

        ReactTestUtils.act(() => {
            render(<ReportHistory />, container);
        });

        const reportSelector = document.querySelector(
            '#reportSelector'
        ) as HTMLSelectElement;
        expect(reportSelector.value).toBe('');
        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(reportSelector, {
                target: ({ value: 'Bug' } as unknown) as EventTarget,
            });
        });
        expect(reportSelector.value).toBe('Bug');

        const sortingSelector = document.querySelector(
            '#sortingSelector'
        ) as HTMLSelectElement;
        expect(sortingSelector.value).toBe('');
        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(sortingSelector, {
                target: ({ value: 'false' } as unknown) as EventTarget,
            });
        });
        expect(sortingSelector.value).toBe('false');

        const submitButton = document.querySelector(
            '[type="submit"]'
        ) as HTMLButtonElement;

        ReactTestUtils.act(() => {
            submitButton.dispatchEvent(
                new MouseEvent('click', { bubbles: true })
            );
        });

        expect(spy).toBeCalledWith(1, 'false', '123456789');
        jest.runAllTimers();

        await ReactTestUtils.act(async () => {
            await Promise.allSettled(spy.mock.results);
        });
    });

    it('should attempt to submit get bug reports request and fail', async () => {
        const rejectedVal = {
            status: 500,
        };
        const spy = jest
            .spyOn(API, 'getBugReportsBySubmitter')
            .mockRejectedValue(rejectedVal);
        jest.useFakeTimers();

        ReactTestUtils.act(() => {
            render(<ReportHistory />, container);
        });

        const reportSelector = document.querySelector(
            '#reportSelector'
        ) as HTMLSelectElement;
        expect(reportSelector.value).toBe('');
        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(reportSelector, {
                target: ({ value: 'Bug' } as unknown) as EventTarget,
            });
        });
        expect(reportSelector.value).toBe('Bug');

        const sortingSelector = document.querySelector(
            '#sortingSelector'
        ) as HTMLSelectElement;
        expect(sortingSelector.value).toBe('');
        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(sortingSelector, {
                target: ({ value: 'true' } as unknown) as EventTarget,
            });
        });
        expect(sortingSelector.value).toBe('true');

        const submitButton = document.querySelector(
            '[type="submit"]'
        ) as HTMLButtonElement;

        ReactTestUtils.act(() => {
            submitButton.dispatchEvent(
                new MouseEvent('click', { bubbles: true })
            );
        });

        expect(spy).toBeCalledWith(1, 'true', '123456789');
        jest.runAllTimers();

        await ReactTestUtils.act(async () => {
            await Promise.allSettled(spy.mock.results);
        });
    });
});
