/* eslint-disable @typescript-eslint/require-await */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import faker from 'faker/locale/en';
import { AxiosResponse } from 'axios';

import { makeFeedbackReport, makeBugReport } from '../reportMaker.mock';
import ReportSummary from './ReportSummary';
import * as API from '../api/api'; // babel issues ref: https://stackoverflow.com/questions/53162001/typeerror-during-jests-spyon-cannot-set-property-getrequest-of-object-which

jest.mock('hooks/useSnack');

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
        const dummyFeedbackReport = makeFeedbackReport();

        // eslint-disable-next-line jest/expect-expect
        it('should create feedback report summary', async () => {
            const callBack = jest.fn();
            ReactTestUtils.act(() => {
                render(
                    <ReportSummary
                        report={dummyFeedbackReport}
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
                        report={dummyFeedbackReport}
                        callBack={callBack}
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
                        report={dummyFeedbackReport}
                        callBack={callBack}
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
                    target: ({
                        value: newDescription,
                    } as unknown) as EventTarget,
                });
            });

            ReactTestUtils.act(() => {
                button.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                );
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
                        report={dummyFeedbackReport}
                        callBack={callBack}
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
                    target: ({
                        value: newDescription,
                    } as unknown) as EventTarget,
                });
            });

            ReactTestUtils.act(() => {
                button.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                );
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
            expect(callBack).not.toBeCalled();
        });

        it('Should delete a feedback report summary and succeed', async () => {
            const callBack = jest.fn();
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
                        report={dummyFeedbackReport}
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
            expect(spy).toBeCalledWith(dummyFeedbackReport._id);
            jest.runAllTimers();
            await ReactTestUtils.act(async () => {
                await Promise.allSettled(spy.mock.results);
            });
            expect(callBack).toBeCalled();
        });

        it('Should attempt to delete a feedback report summary and fail', async () => {
            const callBack = jest.fn();
            const rejectedVal = { status: 500 };
            const spy = jest
                .spyOn(API, 'deleteFeedbackReport')
                .mockRejectedValue(rejectedVal);
            jest.useFakeTimers();

            ReactTestUtils.act(() => {
                render(
                    <ReportSummary
                        report={dummyFeedbackReport}
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
            expect(spy).toBeCalledWith(dummyFeedbackReport._id);
            jest.runAllTimers();
            await ReactTestUtils.act(async () => {
                await Promise.allSettled(spy.mock.results);
            });
            expect(callBack).not.toBeCalled();
        });
    });

    describe('Create bug report summary', () => {
        const dummyBugReport = makeBugReport();

        // eslint-disable-next-line jest/expect-expect
        it('should create bug report summary', async () => {
            const callBack = jest.fn();
            ReactTestUtils.act(() => {
                render(
                    <ReportSummary
                        report={dummyBugReport}
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
                        report={dummyBugReport}
                        callBack={callBack}
                    />,
                    container
                );
            });

            const reportDescriptionNode = document.querySelector(
                '#report-description'
            ) as HTMLInputElement;
            expect(reportDescriptionNode.value).toBe(
                dummyBugReport.description
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
                        report={dummyBugReport}
                        callBack={callBack}
                    />,
                    container
                );
            });

            const reportDescriptionNode = document.querySelector(
                '#report-description'
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
            });

            ReactTestUtils.act(() => {
                button.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                );
            });

            const expectedReport = {
                ...dummyBugReport,
                description: newDescription,
            };
            expect(spy).toBeCalledWith(expectedReport);

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
                        report={dummyBugReport}
                        callBack={callBack}
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
                    target: ({
                        value: newDescription,
                    } as unknown) as EventTarget,
                });
            });
            ReactTestUtils.act(() => {
                button.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                );
            });

            const expectedReport = {
                ...dummyBugReport,
                description: newDescription,
            };
            expect(spy).toBeCalledWith(expectedReport);

            jest.runAllTimers();
            await ReactTestUtils.act(async () => {
                await Promise.allSettled(spy.mock.results);
            });
            expect(callBack).not.toBeCalled();
        });

        it('Should delete a bug report summary and succeed', async () => {
            const callBack = jest.fn();
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
                        report={dummyBugReport}
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
            expect(spy).toBeCalledWith(dummyBugReport._id);
            jest.runAllTimers();
            await ReactTestUtils.act(async () => {
                await Promise.allSettled(spy.mock.results);
            });
            expect(callBack).toBeCalled();
        });

        it('Should attempt to delete a feedback report summary and fail', async () => {
            const callBack = jest.fn();
            const rejectedVal = { status: 500 };
            const spy = jest
                .spyOn(API, 'deleteBugReport')
                .mockRejectedValue(rejectedVal);
            jest.useFakeTimers();

            ReactTestUtils.act(() => {
                render(
                    <ReportSummary
                        report={dummyBugReport}
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
            expect(spy).toBeCalledWith(dummyBugReport._id);
            jest.runAllTimers();
            await ReactTestUtils.act(async () => {
                await Promise.allSettled(spy.mock.results);
            });
            expect(callBack).not.toBeCalled();
        });
    });
});
