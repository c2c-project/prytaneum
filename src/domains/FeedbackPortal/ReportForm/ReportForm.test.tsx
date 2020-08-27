// /* eslint-disable @typescript-eslint/require-await */
// import React from 'react';
// import { render, unmountComponentAtNode } from 'react-dom';
// import ReactTestUtils from 'react-dom/test-utils';
// import faker from 'faker';
// import { AxiosResponse } from 'axios';

// import ReportForm from './ReportForm';
// import * as API from '../api/api';
// import { FeedbackForm, BugReportForm } from '../types';

// jest.mock('hooks/useSnack');

// // TODO: Add failure tests
// const dummyDate = new Date().toISOString();
// const makeDummyFeedbackReportForm = () => ({
//     Report: {
//         _id: '',
//         description: '',
//         date: '',
//         user: {
//             _id: '',
//         },
//     },
//     submitEndpoint: (form: FeedbackForm) =>
//         API.createFeedbackReport(form, dummyDate),
//     deleteEndpoint: (_id: string) => API.deleteFeedbackReport(_id),
// });

// const dummyTownhallId = faker.random.alphaNumeric(12);
// const makeDummyBugReportForm = () => ({
//     Report: {
//         _id: '',
//         description: '',
//         date: '',
//         townhallId: '',
//         user: {
//             _id: '',
//         },
//     },
//     submitEndpoint: (form: BugReportForm) =>
//         API.createBugReport(form, dummyDate, dummyTownhallId),
//     deleteEndpoint: (_id: string) => API.deleteBugReport(_id),
// });

// describe('create report form', () => {
//     let container: HTMLDivElement | null = null;

//     beforeEach(() => {
//         container = document.createElement('div');
//         document.body.appendChild(container);
//     });

//     afterEach(() => {
//         if (container) {
//             unmountComponentAtNode(container);
//             container.remove();
//         }
//         container = null;
//         jest.restoreAllMocks();
//     });

//     describe('Create feedback report form', () => {
//         // eslint-disable-next-line jest/expect-expect
//         it('should create feedback report form', async () => {
//             ReactTestUtils.act(() => {
//                 render(
//                     <ReportForm
//                         title={faker.random.word()}
//                         mainDescription={faker.lorem.paragraph()}
//                         icon={<></>}
//                         reportObject={makeDummyFeedbackReportForm()}
//                     />,
//                     container
//                 );
//             });
//         });

//         it('should change state of feedback report form', async () => {
//             const description = faker.lorem.paragraph();
//             ReactTestUtils.act(() => {
//                 render(
//                     <ReportForm
//                         title={faker.random.word()}
//                         mainDescription={faker.lorem.paragraph()}
//                         icon={<></>}
//                         reportObject={makeDummyFeedbackReportForm()}
//                     />,
//                     container
//                 );
//             });

//             // Get the input field for report description
//             const reportDescriptionNode = document.querySelector(
//                 '#reportDescription'
//             ) as HTMLInputElement;
//             // the input field should be empty after first render
//             expect(reportDescriptionNode.value).toBe('');

//             // Change the input field of the form
//             ReactTestUtils.act(() => {
//                 ReactTestUtils.Simulate.change(reportDescriptionNode, {
//                     target: ({ value: description } as unknown) as EventTarget,
//                 });
//             });
//             // the input field should not be empty anymore
//             expect(reportDescriptionNode.value).toBe(description);
//         });

//         // TODO:This test does not pass because the date used by the component is different than the date declared in the test, by a difference of seconds
//         it('should submit feedback report form and succeed', async () => {
//             const resolvedVal: AxiosResponse = {
//                 status: 200,
//                 data: {},
//                 statusText: 'OK',
//                 headers: {},
//                 config: {},
//             };
//             const spy = jest
//                 .spyOn(API, 'createFeedbackReport')
//                 .mockResolvedValue(resolvedVal);
//             const description = faker.lorem.paragraph();

//             ReactTestUtils.act(() => {
//                 render(
//                     <ReportForm
//                         title={faker.random.word()}
//                         mainDescription={faker.lorem.paragraph()}
//                         icon={<></>}
//                         reportObject={makeDummyFeedbackReportForm()}
//                     />,
//                     container
//                 );
//             });

//             // Get form nodes
//             const reportDescriptionNode = document.querySelector(
//                 '#reportDescription'
//             ) as HTMLInputElement;

//             const button = document.querySelector(
//                 '[type="submit"]'
//             ) as HTMLButtonElement;

//             // Simulate events
//             ReactTestUtils.act(() => {
//                 ReactTestUtils.Simulate.change(reportDescriptionNode, {
//                     target: ({
//                         value: description,
//                     } as unknown) as EventTarget,
//                 });
//                 button.dispatchEvent(
//                     new MouseEvent('click', { bubbles: true })
//                 );
//             });
//             expect(spy).toBeCalledWith({ description }, dummyDate);
//         });
//     });

//     describe('Create bug report form', () => {
//         // eslint-disable-next-line jest/expect-expect
//         it('should create bug report form', async () => {
//             ReactTestUtils.act(() => {
//                 render(
//                     <ReportForm
//                         title={faker.random.word()}
//                         mainDescription={faker.lorem.paragraph()}
//                         icon={<></>}
//                         reportObject={makeDummyBugReportForm()}
//                     />,
//                     container
//                 );
//             });
//         });

//         it('should change state of bug report form', async () => {
//             const description = faker.lorem.paragraph();
//             ReactTestUtils.act(() => {
//                 render(
//                     <ReportForm
//                         title={faker.random.word()}
//                         mainDescription={faker.lorem.paragraph()}
//                         icon={<></>}
//                         reportObject={makeDummyBugReportForm()}
//                     />,
//                     container
//                 );
//             });

//             // Get the input field for report description
//             const reportDescriptionNode = document.querySelector(
//                 '#reportDescription'
//             ) as HTMLInputElement;
//             // the input field should be empty after first render
//             expect(reportDescriptionNode.value).toBe('');

//             // Change the input field of the form
//             ReactTestUtils.act(() => {
//                 ReactTestUtils.Simulate.change(reportDescriptionNode, {
//                     target: ({ value: description } as unknown) as EventTarget,
//                 });
//             });
//             // the input field should not be empty anymore
//             expect(reportDescriptionNode.value).toBe(description);
//         });

//         it('should submit and succeed', async () => {
//             const resolvedVal: AxiosResponse = {
//                 status: 200,
//                 data: {},
//                 statusText: 'OK',
//                 headers: {},
//                 config: {},
//             };
//             const spy = jest
//                 .spyOn(API, 'createBugReport')
//                 .mockResolvedValue(resolvedVal);
//             const description = faker.lorem.paragraph();

//             ReactTestUtils.act(() => {
//                 render(
//                     <ReportForm
//                         title={faker.random.word()}
//                         mainDescription={faker.lorem.paragraph()}
//                         icon={<></>}
//                         reportObject={makeDummyBugReportForm()}
//                     />,
//                     container
//                 );
//             });

//             // Get form nodes
//             const reportDescriptionNode = document.querySelector(
//                 '#reportDescription'
//             ) as HTMLInputElement;
//             const button = document.querySelector(
//                 '[type="submit"]'
//             ) as HTMLButtonElement;

//             // Simulate events
//             ReactTestUtils.act(() => {
//                 ReactTestUtils.Simulate.change(reportDescriptionNode, {
//                     target: ({
//                         value: description,
//                     } as unknown) as EventTarget,
//                 });
//                 button.dispatchEvent(
//                     new MouseEvent('click', { bubbles: true })
//                 );
//             });
//             // Dates may not match
//             expect(spy).toBeCalledWith(
//                 { description },
//                 dummyDate,
//                 dummyTownhallId
//             );
//         });
//     });
// });
