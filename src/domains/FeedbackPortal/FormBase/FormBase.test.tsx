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
        ReactTestUtils.act(() => {
            render(
                <FormBase
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

        ReactTestUtils.act(() => {
            render(
                <FormBase
                    SubmitEndpoint={(form) =>
                        API.createFeedbackReport(form, date)
                    }
                />,
                container
            );
        });

        // Get the input field for report description
        const reportDescriptionNode = document.querySelector(
            '#reportDescription'
        ) as HTMLInputElement;
        // the input field should be empty after first render
        expect(reportDescriptionNode.value).toBe('');

        // Change the input field of the form
        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(reportDescriptionNode, {
                target: { value: description },
            } as any);
        });
        // the input field should not be empty anymore
        expect(reportDescriptionNode.value).toBe(description);
    });

    // TODO: ask David: Why is the spy being called even thought the input field is empty?
    it('should not submit on button click', async () => {
        const spy = jest.spyOn(API, 'createFeedbackReport');
        const date = new Date().toISOString();

        ReactTestUtils.act(() => {
            render(
                <FormBase
                    SubmitEndpoint={(form) =>
                        API.createFeedbackReport(form, date)
                    }
                />,
                container
            );
        });

        // Trigger a button click
        const button = document.querySelector('[type="submit"]');
        ReactTestUtils.act(() => {
            if (button) {
                button.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                );
            }
        });

        expect(spy).not.toBeCalled();
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

        ReactTestUtils.act(() => {
            render(
                <FormBase
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
        );
        const button = document.querySelector('[type="submit"]');

        // Simulate events
        ReactTestUtils.act(() => {
            if (reportDescriptionNode && button) {
                ReactTestUtils.Simulate.change(reportDescriptionNode, {
                    target: { value: description },
                } as any);
                button.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                );
            }
        });
        expect(spy).toBeCalledWith({ description }, date);
    });

    it('should submit and fail', async () => {
        const rejectedVal = { status: 500 };
        const spy = jest
            .spyOn(API, 'createFeedbackReport')
            .mockRejectedValue(rejectedVal);

        const description = faker.lorem.paragraph();
        const date = new Date().toISOString();

        ReactTestUtils.act(() => {
            render(
                <FormBase
                    SubmitEndpoint={(form) =>
                        API.createFeedbackReport(form, date)
                    }
                />,
                container
            );
        });

        ReactTestUtils.act(() => {
            render(
                <FormBase
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
        );
        const button = document.querySelector('[type="submit"]');

        // Simulate events
        ReactTestUtils.act(() => {
            if (reportDescriptionNode && button) {
                ReactTestUtils.Simulate.change(reportDescriptionNode, {
                    target: { value: description },
                } as any);
                button.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                );
            }
        });
        expect(spy).toBeCalledWith({ description }, date);
    });
});
