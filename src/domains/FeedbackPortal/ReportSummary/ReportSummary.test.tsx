/* eslint-disable @typescript-eslint/require-await */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import faker from 'faker';
import { AxiosResponse } from 'axios';

import ReportSummary from './ReportSummary';
import * as API from '../api/api';

jest.mock('hooks/useSnack');

// TODO: When form base is changed to receive onSuccess and onFailure call backs then update this test suite
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
        const FeedbackReport = {
            description: faker.lorem.paragraph(),
            date: new Date().toISOString(),
            _id: faker.random.alphaNumeric(12),
        };

        // eslint-disable-next-line jest/expect-expect
        it('should create feedback report form', async () => {
            ReactTestUtils.act(() => {
                render(
                    <ReportSummary Type='feedback' Report={FeedbackReport} />,
                    container
                );
            });
        });

        it('should change state of feedback summary', async () => {
            const description = faker.lorem.paragraph();
            ReactTestUtils.act(() => {
                render(
                    <ReportSummary Type='feedback' Report={FeedbackReport} />,
                    container
                );
            });

            const reportDescriptionNode = document.querySelector(
                '#reportDescription'
            ) as HTMLInputElement;
            expect(reportDescriptionNode.value).toBe(
                FeedbackReport.description
            );

            ReactTestUtils.act(() => {
                ReactTestUtils.Simulate.change(reportDescriptionNode, {
                    target: ({
                        value: description,
                    } as unknown) as EventTarget,
                });
            });
            expect(reportDescriptionNode.value).toBe(description);
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
            const description = faker.lorem.paragraph();

            ReactTestUtils.act(() => {
                render(
                    <ReportSummary Type='feedback' Report={FeedbackReport} />,
                    container
                );
            });

            const reportDescriptionNode = document.querySelector(
                '#reportDescription'
            ) as HTMLInputElement;
            const button = document.querySelector('[type="submit"]') as HTMLButtonElement;

            ReactTestUtils.act(() => {
                ReactTestUtils.Simulate.change(reportDescriptionNode, {
                    target: ({
                        value: description,
                    } as unknown) as EventTarget,
                });
                button.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                );
            });
            expect(spy).toBeCalledWith({
                description,
                _id: FeedbackReport._id,
            });
        });
    });

    // TODO: Adds a test where the component does not render because townhallId is not provided
    describe('Create bug report summary', () => {
        const BugReport = {
            description: faker.lorem.paragraph(),
            date: new Date().toISOString(),
            _id: faker.random.alphaNumeric(12),
            townhallId: faker.random.alphaNumeric(12),
        };

        // eslint-disable-next-line jest/expect-expect
        it('should create bug report summary', async () => {
            ReactTestUtils.act(() => {
                render(
                    <ReportSummary Type='bug' Report={BugReport} />,
                    container
                );
            });
        });

        it('should change state of bug report summary', async () => {
            const description = faker.lorem.paragraph();
            ReactTestUtils.act(() => {
                render(
                    <ReportSummary Type='bug' Report={BugReport} />,
                    container
                );
            });

            const reportDescriptionNode = document.querySelector(
                '#reportDescription'
            ) as HTMLInputElement;
            expect(reportDescriptionNode.value).toBe(BugReport.description);

            ReactTestUtils.act(() => {
                ReactTestUtils.Simulate.change(reportDescriptionNode, {
                    target: ({
                        value: description,
                    } as unknown) as EventTarget,
                });
            });
            expect(reportDescriptionNode.value).toBe(description);
        });

        it('should update bug report summary  and succeed', async () => {
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
            const description = faker.lorem.paragraph();

            ReactTestUtils.act(() => {
                render(
                    <ReportSummary Type='bug' Report={BugReport} />,
                    container
                );
            });

            const reportDescriptionNode = document.querySelector(
                '#reportDescription'
            ) as HTMLButtonElement;
            const button = document.querySelector('[type="submit"]') as HTMLButtonElement;

            ReactTestUtils.act(() => {
                ReactTestUtils.Simulate.change(reportDescriptionNode, {
                    target: ({
                        value: description,
                    } as unknown) as EventTarget,
                });
                button.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                );
            });
            expect(spy).toBeCalledWith({ description, _id: BugReport._id });
        });
    });
});
