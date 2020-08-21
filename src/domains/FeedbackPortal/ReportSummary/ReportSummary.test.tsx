/* eslint-disable @typescript-eslint/require-await */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import faker from 'faker';
import { AxiosResponse } from 'axios';

import ReportSummary from './ReportSummary';
import * as API from '../api/api';

jest.mock('hooks/useSnack');

// TODO: Test delete button
describe('Update report summary', () => {
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

    describe('Create feedback report summary', () => {
        const FeedbackReportObject = {
            Report: {
                description: faker.lorem.paragraph(),
                date: new Date().toISOString(),
                _id: faker.random.alphaNumeric(12),
                user: {
                    _id: faker.random.alphaNumeric(12),
                },
            },
            update: (form: API.FeedbackForm) => API.updateFeedbackReport(form),
            delete: (form: API.FeedbackForm) => API.deleteFeedbackReport(form),
        };

        // eslint-disable-next-line jest/expect-expect
        it('should create feedback report summary', async () => {
            const callBack = jest.fn();
            ReactTestUtils.act(() => {
                render(
                    <ReportSummary
                        ReportObject={FeedbackReportObject}
                        callBack={callBack}
                    />,
                    container
                );
            });
        });

        it('should change state of feedback report summary', async () => {
            const callBack = jest.fn();
            const newDescription = faker.lorem.paragraph();
            ReactTestUtils.act(() => {
                render(
                    <ReportSummary
                        ReportObject={FeedbackReportObject}
                        callBack={callBack}
                    />,
                    container
                );
            });

            const reportDescriptionNode = document.querySelector(
                '#reportDescription'
            ) as HTMLInputElement;
            expect(reportDescriptionNode.value).toBe(
                FeedbackReportObject.Report.description
            );

            ReactTestUtils.act(() => {
                ReactTestUtils.Simulate.change(reportDescriptionNode, {
                    target: ({
                        value: newDescription,
                    } as unknown) as EventTarget,
                });
            });
            expect(reportDescriptionNode.value).toBe(newDescription);
        });

        it('should update feedback report summary and succeed', async () => {
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
            const callBack = jest.fn();
            jest.useFakeTimers();

            ReactTestUtils.act(() => {
                render(
                    <ReportSummary
                        ReportObject={FeedbackReportObject}
                        callBack={callBack}
                    />,
                    container
                );
            });

            const reportDescriptionNode = document.querySelector(
                '#reportDescription'
            ) as HTMLInputElement;
            const button = document.querySelector(
                '[type="submit"]'
            ) as HTMLButtonElement;

            ReactTestUtils.act(() => {
                ReactTestUtils.Simulate.change(reportDescriptionNode, {
                    target: ({
                        value: newDescription,
                    } as unknown) as EventTarget,
                });
                button.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                );
            });
            expect(spy).toBeCalledWith({
                description: newDescription,
                _id: FeedbackReportObject.Report._id,
            });
            jest.runAllTimers();
            await ReactTestUtils.act(async () => {
                await Promise.allSettled(spy.mock.results);
            });
            expect(callBack).toBeCalled();
        });

        it('should attempt to update feedback report summary and fail', async () => {
            const rejectedVal = { status: 500 };
            const spy = jest
                .spyOn(API, 'updateFeedbackReport')
                .mockRejectedValue(rejectedVal);
            const newDescription = faker.lorem.paragraph();
            const callBack = jest.fn();
            jest.useFakeTimers();

            ReactTestUtils.act(() => {
                render(
                    <ReportSummary
                        ReportObject={FeedbackReportObject}
                        callBack={callBack}
                    />,
                    container
                );
            });

            const reportDescriptionNode = document.querySelector(
                '#reportDescription'
            ) as HTMLInputElement;
            const button = document.querySelector(
                '[type="submit"]'
            ) as HTMLButtonElement;

            ReactTestUtils.act(() => {
                ReactTestUtils.Simulate.change(reportDescriptionNode, {
                    target: ({
                        value: newDescription,
                    } as unknown) as EventTarget,
                });
                button.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                );
            });
            expect(spy).toBeCalledWith({
                description: newDescription,
                _id: FeedbackReportObject.Report._id,
            });

            jest.runAllTimers();
            await ReactTestUtils.act(async () => {
                await Promise.allSettled(spy.mock.results);
            });
            expect(callBack).not.toBeCalled();
        });
    });
    // TODO: Adds a test where the component does not render because townhallId is not provided
    describe('Create bug report summary', () => {
        const BugReportObject = {
            Report: {
                description: faker.lorem.paragraph(),
                date: new Date().toISOString(),
                _id: faker.random.alphaNumeric(12),
                townhallId: faker.random.alphaNumeric(12),
                user: {
                    _id: faker.random.alphaNumeric(12),
                },
            },
            update: (form: API.BugReportForm) => API.updateBugReport(form),
            delete: (form: API.BugReportForm) => API.deleteBugReport(form),
        };

        // eslint-disable-next-line jest/expect-expect
        it('should create bug report summary', async () => {
            const callBack = jest.fn();
            ReactTestUtils.act(() => {
                render(
                    <ReportSummary
                        ReportObject={BugReportObject}
                        callBack={callBack}
                    />,
                    container
                );
            });
        });

        it('should change state of bug report summary', async () => {
            const newDescription = faker.lorem.paragraph();
            const callBack = jest.fn();

            ReactTestUtils.act(() => {
                render(
                    <ReportSummary
                        ReportObject={BugReportObject}
                        callBack={callBack}
                    />,
                    container
                );
            });

            const reportDescriptionNode = document.querySelector(
                '#reportDescription'
            ) as HTMLInputElement;
            expect(reportDescriptionNode.value).toBe(
                BugReportObject.Report.description
            );

            ReactTestUtils.act(() => {
                ReactTestUtils.Simulate.change(reportDescriptionNode, {
                    target: ({
                        value: newDescription,
                    } as unknown) as EventTarget,
                });
            });
            expect(reportDescriptionNode.value).toBe(newDescription);
        });

        it('should update bug report summary and succeed', async () => {
            const resolvedVal: AxiosResponse = {
                status: 200,
                data: {},
                statusText: 'OK',
                headers: {},
                config: {},
            };
            const spy = jest
                .spyOn(API, 'updateBugReport')
                .mockResolvedValue(resolvedVal);
            const newDescription = faker.lorem.paragraph();
            const callBack = jest.fn();
            jest.useFakeTimers();

            ReactTestUtils.act(() => {
                render(
                    <ReportSummary
                        ReportObject={BugReportObject}
                        callBack={callBack}
                    />,
                    container
                );
            });

            const reportDescriptionNode = document.querySelector(
                '#reportDescription'
            ) as HTMLButtonElement;
            const button = document.querySelector(
                '[type="submit"]'
            ) as HTMLButtonElement;

            ReactTestUtils.act(() => {
                ReactTestUtils.Simulate.change(reportDescriptionNode, {
                    target: ({
                        value: newDescription,
                    } as unknown) as EventTarget,
                });
                button.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                );
            });
            expect(spy).toBeCalledWith({
                description: newDescription,
                _id: BugReportObject.Report._id,
            });

            jest.runAllTimers();
            await ReactTestUtils.act(async () => {
                await Promise.allSettled(spy.mock.results);
            });
            expect(callBack).toBeCalled();
        });

        it('should attempt to update bug report summary and fail', async () => {
            const rejectedVal = { status: 500 };
            const spy = jest
                .spyOn(API, 'updateBugReport')
                .mockRejectedValue(rejectedVal);
            const newDescription = faker.lorem.paragraph();
            const callBack = jest.fn();
            jest.useFakeTimers();

            ReactTestUtils.act(() => {
                render(
                    <ReportSummary
                        ReportObject={BugReportObject}
                        callBack={callBack}
                    />,
                    container
                );
            });

            const reportDescriptionNode = document.querySelector(
                '#reportDescription'
            ) as HTMLInputElement;
            const button = document.querySelector(
                '[type="submit"]'
            ) as HTMLButtonElement;

            ReactTestUtils.act(() => {
                ReactTestUtils.Simulate.change(reportDescriptionNode, {
                    target: ({
                        value: newDescription,
                    } as unknown) as EventTarget,
                });
                button.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                );
            });
            expect(spy).toBeCalledWith({
                description: newDescription,
                _id: BugReportObject.Report._id,
            });

            jest.runAllTimers();
            await ReactTestUtils.act(async () => {
                await Promise.allSettled(spy.mock.results);
            });
            expect(callBack).not.toBeCalled();
        });
    });
});
