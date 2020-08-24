/* eslint-disable @typescript-eslint/require-await */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import faker from 'faker';
import { AxiosResponse } from 'axios';

import FormBase from './FormBase';
import * as API from '../api/api';

jest.mock('hooks/useSnack');

// TODO: When form base is changed to receive onSuccess and onFailure call backs then update this test suite
describe('CreateReportRequest', () => {
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
    it('should render report form with create Feedback endpoint', async () => {
        const onSuccess = jest.fn();
        ReactTestUtils.act(() => {
            render(
                <FormBase
                    onSuccess={onSuccess}
                    SubmitEndpoint={(form) =>
                        API.createFeedbackReport(form, new Date().toISOString())
                    }
                />,
                container
            );
        });
    });

    it('should change state of form', async () => {
        const description = faker.lorem.paragraph();
        const date = new Date().toISOString();
        const onSuccess = jest.fn();

        ReactTestUtils.act(() => {
            render(
                <FormBase
                    onSuccess={onSuccess}
                    SubmitEndpoint={(form) =>
                        API.createFeedbackReport(form, date)
                    }
                />,
                container
            );
        });

        const reportDescriptionNode = document.querySelector(
            '#reportDescription'
        ) as HTMLInputElement;
        expect(reportDescriptionNode.value).toBe('');

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
            .spyOn(API, 'createFeedbackReport')
            .mockResolvedValue(resolvedVal);
        const description = faker.lorem.paragraph();
        const date = new Date().toISOString();
        const onSuccess = jest.fn();
        jest.useFakeTimers();

        ReactTestUtils.act(() => {
            render(
                <FormBase
                    SubmitEndpoint={(form) =>
                        API.createFeedbackReport(form, date)
                    }
                    onSuccess={onSuccess}
                />,
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
                target: ({ value: description } as unknown) as EventTarget,
            });
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        expect(spy).toBeCalledWith({ description }, date);
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
            .spyOn(API, 'createFeedbackReport')
            .mockRejectedValue(rejectedVal);

        const description = faker.lorem.paragraph();
        const date = new Date().toISOString();
        jest.useFakeTimers();

        ReactTestUtils.act(() => {
            render(
                <FormBase
                    onSuccess={onSuccess}
                    SubmitEndpoint={(form) =>
                        API.createFeedbackReport(form, date)
                    }
                />,
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
                target: ({ value: description } as unknown) as EventTarget,
            });
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        expect(spy).toBeCalledWith({ description }, date);
        jest.runAllTimers();

        await ReactTestUtils.act(async () => {
            await Promise.allSettled(spy.mock.results);
        });
        expect(onSuccess).not.toBeCalled();
    });
});
