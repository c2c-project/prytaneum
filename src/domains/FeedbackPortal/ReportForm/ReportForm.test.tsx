/* eslint-disable @typescript-eslint/require-await */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import faker from 'faker';
import { AxiosResponse } from 'axios';

import ReportForm from './ReportForm';
import * as API from '../api/api';
import { FeedbackForm, BugReportForm } from '../types';

jest.mock('hooks/useSnack');

describe('create report form', () => {
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

    describe('Create feedback report form', () => {
        const dummyDate = new Date().toISOString();
        const endpointFunctions = {
            submitEndpoint: (form: FeedbackForm) =>
                API.createFeedbackReport(form, dummyDate),
            deleteEndpoint: (_id: string) => API.deleteFeedbackReport(_id),
        };

        // eslint-disable-next-line jest/expect-expect
        it('should create feedback report form', async () => {
            ReactTestUtils.act(() => {
                render(
                    <ReportForm
                        title={faker.random.word()}
                        mainDescription={faker.lorem.paragraph()}
                        icon={<></>}
                        endpointFunctions={endpointFunctions}
                    />,
                    container
                );
            });
        });

        it('should change state of feedback report form', async () => {
            const newDescription = faker.lorem.paragraph();
            ReactTestUtils.act(() => {
                render(
                    <ReportForm
                        title={faker.random.word()}
                        mainDescription={faker.lorem.paragraph()}
                        icon={<></>}
                        endpointFunctions={endpointFunctions}
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
                    target: ({
                        value: newDescription,
                    } as unknown) as EventTarget,
                });
            });
            expect(reportDescriptionNode.value).toBe(newDescription);
        });

        it('should submit feedback report form and succeed', async () => {
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
            const newDescription = faker.lorem.paragraph();
            jest.useFakeTimers();

            ReactTestUtils.act(() => {
                render(
                    <ReportForm
                        title={faker.random.word()}
                        mainDescription={faker.lorem.paragraph()}
                        icon={<></>}
                        endpointFunctions={endpointFunctions}
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
            expect(spy).toBeCalledWith(
                { description: newDescription },
                dummyDate
            );
            jest.runAllTimers();
            await ReactTestUtils.act(async () => {
                await Promise.allSettled(spy.mock.results);
            });
        });

        it('should submit feedback report form and fail', async () => {
            const rejectedVal = { status: 500 };
            const spy = jest
                .spyOn(API, 'createFeedbackReport')
                .mockRejectedValue(rejectedVal);
            const newDescription = faker.lorem.paragraph();
            jest.useFakeTimers();

            ReactTestUtils.act(() => {
                render(
                    <ReportForm
                        title={faker.random.word()}
                        mainDescription={faker.lorem.paragraph()}
                        icon={<></>}
                        endpointFunctions={endpointFunctions}
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
            expect(spy).toBeCalledWith(
                { description: newDescription },
                dummyDate
            );
            jest.runAllTimers();

            await ReactTestUtils.act(async () => {
                await Promise.allSettled(spy.mock.results);
            });
        });
    });

    describe('Create bug report form', () => {
        const dummyDate = new Date().toISOString();
        const dummyTownhallId = faker.random.alphaNumeric(12);
        const endpointFunctions = {
            submitEndpoint: (form: BugReportForm) =>
                API.createBugReport(form, dummyDate, dummyTownhallId),
            deleteEndpoint: (_id: string) => API.deleteBugReport(_id),
        };

        // eslint-disable-next-line jest/expect-expect
        it('should create bug report form', async () => {
            ReactTestUtils.act(() => {
                render(
                    <ReportForm
                        title={faker.random.word()}
                        mainDescription={faker.lorem.paragraph()}
                        icon={<></>}
                        endpointFunctions={endpointFunctions}
                    />,
                    container
                );
            });
        });

        it('should change state of bug report form', async () => {
            const newDescription = faker.lorem.paragraph();
            ReactTestUtils.act(() => {
                render(
                    <ReportForm
                        title={faker.random.word()}
                        mainDescription={faker.lorem.paragraph()}
                        icon={<></>}
                        endpointFunctions={endpointFunctions}
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
                    target: ({
                        value: newDescription,
                    } as unknown) as EventTarget,
                });
            });
            expect(reportDescriptionNode.value).toBe(newDescription);
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
                .spyOn(API, 'createBugReport')
                .mockResolvedValue(resolvedVal);
            const newDescription = faker.lorem.paragraph();
            jest.useFakeTimers();

            ReactTestUtils.act(() => {
                render(
                    <ReportForm
                        title={faker.random.word()}
                        mainDescription={faker.lorem.paragraph()}
                        icon={<></>}
                        endpointFunctions={endpointFunctions}
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
            expect(spy).toBeCalledWith(
                { description: newDescription },
                dummyDate,
                dummyTownhallId
            );
            jest.runAllTimers();

            await ReactTestUtils.act(async () => {
                await Promise.allSettled(spy.mock.results);
            });
        });

        it('should submit and fail', async () => {
            const resolvedVal = {
                status: 500,
            };
            const spy = jest
                .spyOn(API, 'createBugReport')
                .mockRejectedValue(resolvedVal);
            const newDescription = faker.lorem.paragraph();
            jest.useFakeTimers();

            ReactTestUtils.act(() => {
                render(
                    <ReportForm
                        title={faker.random.word()}
                        mainDescription={faker.lorem.paragraph()}
                        icon={<></>}
                        endpointFunctions={endpointFunctions}
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

            expect(spy).toBeCalledWith(
                { description: newDescription },
                dummyDate,
                dummyTownhallId
            );
            jest.runAllTimers();

            await ReactTestUtils.act(async () => {
                await Promise.allSettled(spy.mock.results);
            });
        });
    });
});
