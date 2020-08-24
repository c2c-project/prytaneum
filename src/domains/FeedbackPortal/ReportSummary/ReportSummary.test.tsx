/* eslint-disable @typescript-eslint/require-await */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import faker from 'faker';
import { AxiosResponse } from 'axios';

import ReportSummary from './ReportSummary';
import * as API from '../api/api';
import { FeedbackForm, BugReportForm } from '../types';

jest.mock('hooks/useSnack');

// TODO: Check whether onUpdates are called
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
            update: (form: FeedbackForm) => API.updateFeedbackReport(form),
            delete: (_id: string) => API.deleteFeedbackReport(_id),
        };

        // eslint-disable-next-line jest/expect-expect
        it('should create feedback report summary', async () => {
            const onUpdate = jest.fn();
            const onDelete = jest.fn();
            const callBack = jest.fn();
            ReactTestUtils.act(() => {
                render(
                    <ReportSummary
                        reportObject={FeedbackReportObject}
                        callBack={callBack}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />,
                    container
                );
            });
        });

        it('should change state of feedback report summary', async () => {
            const callBack = jest.fn();
            const onDelete = jest.fn();
            const onUpdate = jest.fn();
            const newDescription = faker.lorem.paragraph();
            ReactTestUtils.act(() => {
                render(
                    <ReportSummary
                        reportObject={FeedbackReportObject}
                        callBack={callBack}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
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
            const onDelete = jest.fn();
            const onUpdate = jest.fn();
            jest.useFakeTimers();

            ReactTestUtils.act(() => {
                render(
                    <ReportSummary
                        reportObject={FeedbackReportObject}
                        callBack={callBack}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
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
            const onDelete = jest.fn();
            const onUpdate = jest.fn();
            jest.useFakeTimers();

            ReactTestUtils.act(() => {
                render(
                    <ReportSummary
                        reportObject={FeedbackReportObject}
                        callBack={callBack}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
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

        it('Should delete a feedback report summary and succeed', async () => {
            const callBack = jest.fn();
            const onDelete = jest.fn();
            const onUpdate = jest.fn();
            const resolvedVal: AxiosResponse = {
                status: 200,
                data: {},
                statusText: 'OK',
                headers: {},
                config: {},
            };
            const spy = jest
                .spyOn(API, 'deleteFeedbackReport')
                .mockResolvedValue(resolvedVal);
            jest.useFakeTimers();

            ReactTestUtils.act(() => {
                render(
                    <ReportSummary
                        reportObject={FeedbackReportObject}
                        callBack={callBack}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />,
                    container
                );
            });
            const deleteButton = document.querySelector(
                '#deleteButton'
            ) as HTMLButtonElement;

            ReactTestUtils.act(() => {
                deleteButton.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                );
            });
            expect(spy).toBeCalledWith(FeedbackReportObject.Report._id);
            jest.runAllTimers();
            await ReactTestUtils.act(async () => {
                await Promise.allSettled(spy.mock.results);
            });
            expect(onDelete).toBeCalled();
            expect(callBack).toBeCalled();
        });

        it('Should attempt to delete a feedback report summary and fail', async () => {
            const callBack = jest.fn();
            const onDelete = jest.fn();
            const onUpdate = jest.fn();
            const rejectedVal = { status: 500 };
            const spy = jest
                .spyOn(API, 'deleteFeedbackReport')
                .mockRejectedValue(rejectedVal);
            jest.useFakeTimers();

            ReactTestUtils.act(() => {
                render(
                    <ReportSummary
                        reportObject={FeedbackReportObject}
                        callBack={callBack}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />,
                    container
                );
            });
            const deleteButton = document.querySelector(
                '#deleteButton'
            ) as HTMLButtonElement;

            ReactTestUtils.act(() => {
                deleteButton.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                );
            });
            expect(spy).toBeCalledWith(FeedbackReportObject.Report._id);
            jest.runAllTimers();
            await ReactTestUtils.act(async () => {
                await Promise.allSettled(spy.mock.results);
            });
            expect(callBack).not.toBeCalled();
            expect(onDelete).not.toBeCalled();
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
            update: (form: BugReportForm) => API.updateBugReport(form),
            delete: (_id: string) => API.deleteBugReport(_id),
        };

        // eslint-disable-next-line jest/expect-expect
        it('should create bug report summary', async () => {
            const callBack = jest.fn();
            const onUpdate = jest.fn();
            const onDelete = jest.fn();
            ReactTestUtils.act(() => {
                render(
                    <ReportSummary
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                        reportObject={BugReportObject}
                        callBack={callBack}
                    />,
                    container
                );
            });
        });

        it('should change state of bug report summary', async () => {
            const newDescription = faker.lorem.paragraph();
            const callBack = jest.fn();
            const onUpdate = jest.fn();
            const onDelete = jest.fn();
            ReactTestUtils.act(() => {
                render(
                    <ReportSummary
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                        reportObject={BugReportObject}
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
            const onUpdate = jest.fn();
            const onDelete = jest.fn();
            jest.useFakeTimers();

            ReactTestUtils.act(() => {
                render(
                    <ReportSummary
                        reportObject={BugReportObject}
                        callBack={callBack}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
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
            const onUpdate = jest.fn();
            const onDelete = jest.fn();
            jest.useFakeTimers();

            ReactTestUtils.act(() => {
                render(
                    <ReportSummary
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                        reportObject={BugReportObject}
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

        it('Should delete a bug report summary and succeed', async () => {
            const callBack = jest.fn();
            const onUpdate = jest.fn();
            const onDelete = jest.fn();
            const resolvedVal: AxiosResponse = {
                status: 200,
                data: {},
                statusText: 'OK',
                headers: {},
                config: {},
            };
            const spy = jest
                .spyOn(API, 'deleteBugReport')
                .mockResolvedValue(resolvedVal);
            jest.useFakeTimers();

            ReactTestUtils.act(() => {
                render(
                    <ReportSummary
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                        reportObject={BugReportObject}
                        callBack={callBack}
                    />,
                    container
                );
            });
            const deleteButton = document.querySelector(
                '#deleteButton'
            ) as HTMLButtonElement;

            ReactTestUtils.act(() => {
                deleteButton.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                );
            });
            expect(spy).toBeCalledWith(BugReportObject.Report._id);
            jest.runAllTimers();
            await ReactTestUtils.act(async () => {
                await Promise.allSettled(spy.mock.results);
            });
            expect(callBack).toBeCalled();
            expect(onDelete).toBeCalled();
        });

        it('Should attempt to delete a feedback report summary and fail', async () => {
            const callBack = jest.fn();
            const onUpdate = jest.fn();
            const onDelete = jest.fn();
            const rejectedVal = { status: 500 };
            const spy = jest
                .spyOn(API, 'deleteBugReport')
                .mockRejectedValue(rejectedVal);
            jest.useFakeTimers();

            ReactTestUtils.act(() => {
                render(
                    <ReportSummary
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                        reportObject={BugReportObject}
                        callBack={callBack}
                    />,
                    container
                );
            });
            const deleteButton = document.querySelector(
                '#deleteButton'
            ) as HTMLButtonElement;

            ReactTestUtils.act(() => {
                deleteButton.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                );
            });
            expect(spy).toBeCalledWith(BugReportObject.Report._id);
            jest.runAllTimers();
            await ReactTestUtils.act(async () => {
                await Promise.allSettled(spy.mock.results);
            });
            expect(callBack).not.toBeCalled();
            expect(onDelete).not.toBeCalled();
        });
    });
});
