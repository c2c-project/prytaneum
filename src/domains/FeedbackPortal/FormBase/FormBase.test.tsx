/* eslint-disable @typescript-eslint/require-await */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { AxiosResponse } from 'axios';
import faker from 'faker';

import { makeFeedbackReport } from '../reportMaker.mocks';
import ReportEndpointContext from '../Contexts/ReportEndpointContext';
import FormBase from './FormBase';
import * as API from '../api/api'; // babel issues ref: https://stackoverflow.com/questions/53162001/typeerror-during-jests-spyon-cannot-set-property-getrequest-of-object-which
import { FeedbackForm } from '../types';

jest.mock('hooks/useSnack');

describe('CreateReportRequest', () => {
    const customEndpoints = {
        submitEndpoint: (form: FeedbackForm) => API.updateFeedbackReport(form),
        deleteEndpoint: (_id: string) => API.deleteFeedbackReport(_id),
    };
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
        const callback = jest.fn();

        ReactTestUtils.act(() => {
            render(
                <ReportEndpointContext.Provider value={customEndpoints}>
                    <FormBase
                        report={dummyFeedbackReport}
                        onSuccess={onSuccess}
                        callback={callback}
                    />
                </ReportEndpointContext.Provider>,
                container
            );
        });
    });

    it('should change state of form', async () => {
        const description = faker.lorem.paragraph();
        const onSuccess = jest.fn();
        const callback = jest.fn();

        ReactTestUtils.act(() => {
            render(
                <ReportEndpointContext.Provider value={customEndpoints}>
                    <FormBase
                        onSuccess={onSuccess}
                        callback={callback}
                        report={dummyFeedbackReport}
                    />
                </ReportEndpointContext.Provider>,
                container
            );
        });

        const reportDescriptionNode = document.querySelector(
            '#reportDescription'
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
        const callback = jest.fn();

        jest.useFakeTimers();

        ReactTestUtils.act(() => {
            render(
                <ReportEndpointContext.Provider value={customEndpoints}>
                    <FormBase
                        onSuccess={onSuccess}
                        callback={callback}
                        report={dummyFeedbackReport}
                    />
                </ReportEndpointContext.Provider>,
                container
            );
        });

        // Get form nodes
        const reportDescriptionNode = document.querySelector(
            '#reportDescription'
        ) as HTMLInputElement;
        const button = document.querySelector(
            '[type="submit"]'
        ) as HTMLButtonElement;

        // Simulate events
        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(reportDescriptionNode, {
                target: ({ value: newDescription } as unknown) as EventTarget,
            });
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
        expect(callback).toBeCalled();
    });

    it('should submit and fail', async () => {
        const onSuccess = jest.fn();
        const callback = jest.fn();

        const rejectedVal = { status: 500 };
        const spy = jest
            .spyOn(API, 'updateFeedbackReport')
            .mockRejectedValue(rejectedVal);

        const newDescription = faker.lorem.paragraph();
        jest.useFakeTimers();

        ReactTestUtils.act(() => {
            render(
                <ReportEndpointContext.Provider value={customEndpoints}>
                    <FormBase
                        onSuccess={onSuccess}
                        callback={callback}
                        report={dummyFeedbackReport}
                    />
                </ReportEndpointContext.Provider>,
                container
            );
        });

        // Get form nodes
        const reportDescriptionNode = document.querySelector(
            '#reportDescription'
        ) as HTMLInputElement;
        const button = document.querySelector(
            '[type="submit"]'
        ) as HTMLButtonElement;

        // Simulate events
        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(reportDescriptionNode, {
                target: ({ value: newDescription } as unknown) as EventTarget,
            });
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
        expect(callback).not.toBeCalled();
    });
});
