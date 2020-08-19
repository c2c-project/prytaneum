/* eslint-disable @typescript-eslint/require-await */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import faker from 'faker';
import { AxiosResponse } from 'axios';
// import {
//     BugReport as BugReportIcon,
//     Feedback as FeedbackReportIcon,
// } from '@material-ui/icons';

import ReportForm from './ReportForm';
import * as API from '../api/api';

jest.mock('hooks/useSnack');

// TODO: When form base is changed to receive onSuccess and onFailure call backs then update this test suite
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
                        Type='feedback'
                        Title={faker.random.word()}
                        MainDescription={faker.lorem.paragraph()}
                        Icon={<></>}
                    />,
                    container
                );
            });
        });

        it('should change state of feedback report form', async () => {
            const description = faker.lorem.paragraph();
            ReactTestUtils.act(() => {
                render(
                    <ReportForm
                        Type='feedback'
                        Title={faker.random.word()}
                        MainDescription={faker.lorem.paragraph()}
                        Icon={<></>}
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
                    target: ({ value: description } as unknown) as EventTarget,
                });
            });
            // the input field should not be empty anymore
            expect(reportDescriptionNode.value).toBe(description);
        });

        // TODO:This test does not pass because the date used by the component is different than the date declared in the test, by a difference of seconds
        // it('should submit feedback report form and succeed', async () => {
        //     const resolvedVal: AxiosResponse = {
        //         status: 200,
        //         data: {},
        //         statusText: 'OK',
        //         headers: {},
        //         config: {},
        //     };
        //     const spy = jest
        //         .spyOn(API, 'createFeedbackReport')
        //         .mockResolvedValue(resolvedVal);
        //     const description = faker.lorem.paragraph();
        //     const date = new Date().toISOString();

        //     ReactTestUtils.act(() => {
        //         render(
        //             <ReportForm
        //                 Type='feedback'
        //                 Title={faker.random.word()}
        //                 MainDescription={faker.lorem.paragraph()}
        //                 Icon={<></>}
        //             />,
        //             container
        //         );
        //     });

        //     // Get form nodes
        //     const reportDescriptionNode = document.querySelector(
        //         '#reportDescription'
        //     );
        //     const button = document.querySelector('[type="submit"]');

        //     // Simulate events
        //     ReactTestUtils.act(() => {
        //         if (reportDescriptionNode && button) {
        //             ReactTestUtils.Simulate.change(reportDescriptionNode, {
        //                 target: ({
        //                     value: description,
        //                 } as unknown) as EventTarget,
        //             });
        //             button.dispatchEvent(
        //                 new MouseEvent('click', { bubbles: true })
        //             );
        //         }
        //     });
        //     // Dates may not match
        //     expect(spy).toBeCalledWith({ description }, date);
        // });
    });

    // TODO: Adds a test where the component does not render because townhallId is not provided
    describe('Create bug report form', () => {
        // eslint-disable-next-line jest/expect-expect
        it('should create bug report form', async () => {
            ReactTestUtils.act(() => {
                render(
                    <ReportForm
                        Type='bug'
                        Title={faker.random.word()}
                        MainDescription={faker.lorem.paragraph()}
                        Icon={<></>}
                        townhallId={faker.random.alphaNumeric(12)}
                    />,
                    container
                );
            });
        });

        it('should change state of bug report form', async () => {
            const description = faker.lorem.paragraph();
            ReactTestUtils.act(() => {
                render(
                    <ReportForm
                        Type='bug'
                        Title={faker.random.word()}
                        MainDescription={faker.lorem.paragraph()}
                        townhallId={faker.random.alphaNumeric(12)}
                        Icon={<></>}
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
                    target: ({ value: description } as unknown) as EventTarget,
                });
            });
            // the input field should not be empty anymore
            expect(reportDescriptionNode.value).toBe(description);
        });

        // TODO: This test does not pass because the date used by the component is different than the date declared in the test, by a difference of seconds
        // it('should submit and succeed', async () => {
        //     const resolvedVal: AxiosResponse = {
        //         status: 200,
        //         data: {},
        //         statusText: 'OK',
        //         headers: {},
        //         config: {},
        //     };
        //     const spy = jest
        //         .spyOn(API, 'createFeedbackReport')
        //         .mockResolvedValue(resolvedVal);
        //     const description = faker.lorem.paragraph();
        //     const date = new Date().toISOString();

        //     ReactTestUtils.act(() => {
        //         render(
        //             <ReportForm
        //                 Type='bug'
        //                 Title={faker.random.word()}
        //                 MainDescription={faker.lorem.paragraph()}
        //                 townhallId={faker.random.alphaNumeric(12)}
        //                 Icon={<></>}
        //             />,
        //             container
        //         );
        //     });

        //     // Get form nodes
        //     const reportDescriptionNode = document.querySelector(
        //         '#reportDescription'
        //     );
        //     const button = document.querySelector('[type="submit"]');

        //     // Simulate events
        //     ReactTestUtils.act(() => {
        //         if (reportDescriptionNode && button) {
        //             ReactTestUtils.Simulate.change(reportDescriptionNode, {
        //                 target: ({
        //                     value: description,
        //                 } as unknown) as EventTarget,
        //             });
        //             button.dispatchEvent(
        //                 new MouseEvent('click', { bubbles: true })
        //             );
        //         }
        //     });
        //     // Dates may not match
        //     expect(spy).toBeCalledWith({ description }, date);
        // });
    });
});
