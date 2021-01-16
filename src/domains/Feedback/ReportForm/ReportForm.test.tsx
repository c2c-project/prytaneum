/* eslint-disable @typescript-eslint/require-await */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import faker from 'faker';
import { AxiosResponse } from 'axios';

import ReportForm from './ReportForm';
import * as API from '../api/api'; // babel issues ref: https://stackoverflow.com/questions/53162001/typeerror-during-jests-spyon-cannot-set-property-getrequest-of-object-which

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
        // eslint-disable-next-line jest/expect-expect
        it('should create feedback report form', async () => {
            ReactTestUtils.act(() => {
                render(
                    <ReportForm
                        title={faker.random.word()}
                        mainDescription={faker.lorem.paragraph()}
                        icon={<></>}
                        reportType='Feedback'
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
                        reportType='Feedback'
                    />,
                    container
                );
            });

            const reportDescriptionNode = document.querySelector(
                '#report-description'
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
                        reportType='Feedback'
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
                button.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                );
            });
            // Can't know the date the function was called with
            expect(spy).toBeCalled();
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
                        reportType='Feedback'
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
                button.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                );
            });
            expect(spy).toBeCalled();
            jest.runAllTimers();

            await ReactTestUtils.act(async () => {
                await Promise.allSettled(spy.mock.results);
            });
        });
    });

    describe('Create bug report form', () => {
        const townhallId = faker.random.alphaNumeric(12);
        // eslint-disable-next-line jest/expect-expect
        it('should create bug report form', async () => {
            ReactTestUtils.act(() => {
                render(
                    <ReportForm
                        title={faker.random.word()}
                        mainDescription={faker.lorem.paragraph()}
                        icon={<></>}
                        reportType='Bug'
                        townhallId={townhallId}
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
                        reportType='Bug'
                        townhallId={townhallId}
                    />,
                    container
                );
            });

            const reportDescriptionNode = document.querySelector(
                '#report-description'
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
                        reportType='Bug'
                        townhallId={townhallId}
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
                button.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                );
            });
            // Can't tell with what date it is called
            expect(spy).toBeCalled();
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
                        reportType='Bug'
                        townhallId={townhallId}
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
                button.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                );
            });

            expect(spy).toBeCalled();
            jest.runAllTimers();
            await ReactTestUtils.act(async () => {
                await Promise.allSettled(spy.mock.results);
            });
        });
    });
});
