/* eslint-disable @typescript-eslint/require-await */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { AxiosResponse } from 'axios';
import faker from 'faker/locale/en';

import { makeFeedbackReport } from '../reportMaker.mock';
import FormBase from './FormBase';
import * as API from '../api/api'; // babel issues ref: https://stackoverflow.com/questions/53162001/typeerror-during-jests-spyon-cannot-set-property-getrequest-of-object-which

jest.mock('hooks/useSnack');

describe('CreateReportRequest', () => {
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
                    report={dummyFeedbackReport}
                    onSuccess={onSuccess}
                    reportType='Feedback'
                    submitType='update'
                />,
                container
            );
        });
    });

    it('should change state of form', async () => {
        const description = faker.lorem.paragraph();
        const onSuccess = jest.fn();

        ReactTestUtils.act(() => {
            render(
                <FormBase
                    onSuccess={onSuccess}
                    report={dummyFeedbackReport}
                    reportType='Feedback'
                    submitType='update'
                />,
                container
            );
        });

        const reportDescriptionNode = document.querySelector(
            '#report-description'
        ) as HTMLInputElement;
        expect(reportDescriptionNode.value).toBe(
            dummyFeedbackReport.description
        );

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
        const spy = jest
            .spyOn(API, 'updateFeedbackReport')
            .mockResolvedValue(resolvedVal);
        const newDescription = faker.lorem.paragraph();
        const onSuccess = jest.fn();

        jest.useFakeTimers();

        ReactTestUtils.act(() => {
            render(
                <FormBase
                    onSuccess={onSuccess}
                    reportType='Feedback'
                    submitType='update'
                    report={dummyFeedbackReport}
                />,
                container
            );
        });

        const reportDescriptionNode = document.querySelector(
            '#report-description'
        ) as HTMLInputElement;
        const button = document.querySelector(
            '[type="submit"]'
        ) as HTMLButtonElement;

        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(reportDescriptionNode, {
                target: ({ value: newDescription } as unknown) as EventTarget,
            });
        });

        ReactTestUtils.act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        const expectedReport = {
            ...dummyFeedbackReport,
            description: newDescription,
        };
        expect(spy).toBeCalledWith(expectedReport);
        jest.runAllTimers();

        await ReactTestUtils.act(async () => {
            await Promise.allSettled(spy.mock.results);
        });
        expect(onSuccess).toBeCalled();
    });

    it('should submit and fail', async () => {
        const onSuccess = jest.fn();
        const rejectedVal = { status: 500 };
        const spy = jest
            .spyOn(API, 'updateFeedbackReport')
            .mockRejectedValue(rejectedVal);

        const newDescription = faker.lorem.paragraph();
        jest.useFakeTimers();

        ReactTestUtils.act(() => {
            render(
                <FormBase
                    onSuccess={onSuccess}
                    reportType='Feedback'
                    submitType='update'
                    report={dummyFeedbackReport}
                />,
                container
            );
        });

        // Get form nodes
        const reportDescriptionNode = document.querySelector(
            '#report-description'
        ) as HTMLInputElement;
        const button = document.querySelector(
            '[type="submit"]'
        ) as HTMLButtonElement;

        // Simulate events
        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(reportDescriptionNode, {
                target: ({ value: newDescription } as unknown) as EventTarget,
            });
        });

        ReactTestUtils.act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        const expectedReport = {
            ...dummyFeedbackReport,
            description: newDescription,
        };
        expect(spy).toBeCalledWith(expectedReport);
        jest.runAllTimers();

        await ReactTestUtils.act(async () => {
            await Promise.allSettled(spy.mock.results);
        });
        expect(onSuccess).not.toBeCalled();
    });
});
