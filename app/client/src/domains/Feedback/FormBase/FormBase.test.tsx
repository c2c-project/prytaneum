/* eslint-disable @typescript-eslint/require-await */
import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { AxiosResponse } from 'axios';
import { makeFeedbackReport, makeFeedbackReportForm } from 'prytaneum-typings';

import FormBase from './FormBase';
import * as API from '../api/api'; // babel issues ref: https://stackoverflow.com/questions/53162001/typeerror-during-jests-spyon-cannot-set-property-getrequest-of-object-which

jest.mock('@local/hooks/useSnack');

describe('Update report at the base level', () => {
    const dummyFeedbackReport = makeFeedbackReport();
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
    it('should render report form with update Feedback endpoint', async () => {
        const onSuccess = jest.fn();

        ReactTestUtils.act(() => {
            render(
                <FormBase
                    report={{ ...dummyFeedbackReport, type: 'Feedback' }}
                    onSuccess={onSuccess}
                    reportType='Feedback'
                    submitType='update'
                />,
                container
            );
        });
    });

    it('should change state of form', async () => {
        const { description } = makeFeedbackReportForm();
        const onSuccess = jest.fn();

        ReactTestUtils.act(() => {
            render(
                <FormBase
                    onSuccess={onSuccess}
                    report={{ ...dummyFeedbackReport, type: 'Feedback' }}
                    reportType='Feedback'
                    submitType='update'
                />,
                container
            );
        });

        const reportDescriptionNode = document.querySelector('#report-description') as HTMLInputElement;
        expect(reportDescriptionNode.value).toBe(dummyFeedbackReport.description);

        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(reportDescriptionNode, {
                target: ({ value: description } as unknown) as EventTarget,
            });
        });
        expect(reportDescriptionNode.value).toBe(description);
    });

    it('should submit and succeed', async () => {
        const resolvedVal: AxiosResponse = {
            status: 200,
            data: {},
            statusText: 'OK',
            headers: {},
            config: {},
        };
        const spy = jest.spyOn(API, 'updateFeedbackReport').mockResolvedValue(resolvedVal);
        const feedbackReportForm = makeFeedbackReportForm();
        const onSuccess = jest.fn();

        jest.useFakeTimers();

        ReactTestUtils.act(() => {
            render(
                <FormBase
                    onSuccess={onSuccess}
                    reportType='Feedback'
                    submitType='update'
                    report={{ ...dummyFeedbackReport, type: 'Feedback' }}
                />,
                container
            );
        });

        const reportDescriptionNode = document.querySelector('#report-description') as HTMLInputElement;
        const button = document.querySelector('[type="submit"]') as HTMLButtonElement;

        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(reportDescriptionNode, {
                target: ({ value: feedbackReportForm.description } as unknown) as EventTarget,
            });
        });

        ReactTestUtils.act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(spy).toBeCalledWith(feedbackReportForm, dummyFeedbackReport._id);
        jest.runAllTimers();

        await ReactTestUtils.act(async () => {
            await Promise.allSettled(spy.mock.results);
        });
        expect(onSuccess).toBeCalled();
    });

    it('should submit and fail', async () => {
        const onSuccess = jest.fn();
        const rejectedVal = { status: 500 };
        const spy = jest.spyOn(API, 'updateFeedbackReport').mockRejectedValue(rejectedVal);

        const feedbackReportForm = makeFeedbackReportForm();
        jest.useFakeTimers();

        ReactTestUtils.act(() => {
            render(
                <FormBase
                    onSuccess={onSuccess}
                    reportType='Feedback'
                    submitType='update'
                    report={{ ...dummyFeedbackReport, type: 'Feedback' }}
                />,
                container
            );
        });

        // Get form nodes
        const reportDescriptionNode = document.querySelector('#report-description') as HTMLInputElement;
        const button = document.querySelector('[type="submit"]') as HTMLButtonElement;

        // Simulate events
        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(reportDescriptionNode, {
                target: ({ value: feedbackReportForm.description } as unknown) as EventTarget,
            });
        });

        ReactTestUtils.act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(spy).toBeCalledWith(feedbackReportForm, dummyFeedbackReport._id);
        jest.runAllTimers();

        await ReactTestUtils.act(async () => {
            await Promise.allSettled(spy.mock.results);
        });
        expect(onSuccess).not.toBeCalled();
    });
});
