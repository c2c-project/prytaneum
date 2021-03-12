import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import faker from 'faker';

import ReplyForm from './ReplyForm';

jest.mock('hooks/useSnack');

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
    it('Should open reply dialog', () => {
        ReactTestUtils.act(() => {
            render(<ReplyForm reportId={reportId} reportType='Feedback' />, container);
        });
        const replyButton = document.querySelector('#reply-button') as HTMLButtonElement;

        ReactTestUtils.act(() => {
            replyButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        const replyTextField = document.querySelector('#reply-content') as HTMLInputElement;

        expect(replyTextField.value).toBe('');
    });

    it('Should open reply dialog and change reply content', () => {
        const replyContent = faker.lorem.paragraph();
        ReactTestUtils.act(() => {
            render(<ReplyForm reportId={reportId} reportType='Feedback' />, container);
        });
        const replyButton = document.querySelector('#reply-button') as HTMLButtonElement;

        ReactTestUtils.act(() => {
            replyButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        const replyTextField = document.querySelector('#reply-content') as HTMLInputElement;
        expect(replyTextField.value).toBe('');

        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(replyTextField, {
                target: ({
                    value: replyContent,
                } as unknown) as EventTarget,
            });
        });
        expect(replyTextField.value).toBe(replyContent);
    });
});
