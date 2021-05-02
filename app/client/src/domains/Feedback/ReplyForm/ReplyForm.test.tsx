import * as React from 'react';
import { AxiosResponse } from 'axios';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import faker from 'faker';
import { makeReportReplyForm } from 'prytaneum-typings';

import * as API from '../api/api'; // babel issues ref: https://stackoverflow.com/questions/53162001/typeerror-during-jests-spyon-cannot-set-property-getrequest-of-object-which
import ReplyForm from './ReplyForm';

jest.mock('@local/hooks/useSnack');

describe('Reply Form', () => {
    let container: HTMLDivElement | null = null;
    const reportId = faker.random.alphaNumeric(12);
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
    it('should render reply form ', () => {
        ReactTestUtils.act(() => {
            render(<ReplyForm reportId={reportId} reportType='Feedback' />, container);
        });
    });

    it('should change reply content', () => {
        const { content } = makeReportReplyForm();
        ReactTestUtils.act(() => {
            render(<ReplyForm reportId={reportId} reportType='Feedback' />, container);
        });

        const replyTextField = document.querySelector('#reply-content') as HTMLInputElement;
        expect(replyTextField.value).toBe('');

        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(replyTextField, {
                target: ({
                    value: content,
                } as unknown) as EventTarget,
            });
        });
        expect(replyTextField.value).toBe(content);
    });

    it('should input a reply, submit it, and suceed', () => {
        const resolvedVal: AxiosResponse = {
            status: 200,
            data: {},
            statusText: 'OK',
            headers: {},
            config: {},
        };
        const spy = jest.spyOn(API, 'replyToReport').mockResolvedValue(resolvedVal);
        const { content } = makeReportReplyForm();

        ReactTestUtils.act(() => {
            render(<ReplyForm reportId={reportId} reportType='Feedback' />, container);
        });

        const replyTextField = document.querySelector('#reply-content') as HTMLInputElement;
        const button = document.querySelector('#submit-reply-button') as HTMLButtonElement;

        expect(replyTextField.value).toBe('');

        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(replyTextField, {
                target: ({
                    value: content,
                } as unknown) as EventTarget,
            });
        });
        expect(replyTextField.value).toBe(content);

        ReactTestUtils.act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(spy).toBeCalledWith(reportId, content, 'Feedback');
    });

    it('should input a reply, submit it, and fail', () => {
        const rejectedVal = { status: 500 };
        const spy = jest.spyOn(API, 'replyToReport').mockRejectedValue(rejectedVal);
        const { content } = makeReportReplyForm();
        ReactTestUtils.act(() => {
            render(<ReplyForm reportId={reportId} reportType='Feedback' />, container);
        });

        const replyTextField = document.querySelector('#reply-content') as HTMLInputElement;
        const button = document.querySelector('#submit-reply-button') as HTMLButtonElement;

        expect(replyTextField.value).toBe('');

        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(replyTextField, {
                target: ({
                    value: content,
                } as unknown) as EventTarget,
            });
        });
        expect(replyTextField.value).toBe(content);

        ReactTestUtils.act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(spy).toBeCalledWith(reportId, content, 'Feedback');
    });
});
