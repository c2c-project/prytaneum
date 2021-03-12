/* eslint-disable @typescript-eslint/require-await */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { makeReportReply } from 'prytaneum-typings';

import { formatDate } from 'utils/format';
import Reply from './Reply';

jest.mock('hooks/useSnack');

describe('Reply Form', () => {
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

    // eslint-disable-next-line jest/expect-expect
    it('should render reply', async () => {
        ReactTestUtils.act(() => {
            render(<Reply reply={makeReportReply()} />, container);
        });
    });

    it('Should verify the content of the reply', async () => {
        const reply = makeReportReply();
        ReactTestUtils.act(() => {
            render(<Reply reply={reply} />, container);
        });
        const replyContent = document.querySelector('#reply-content') as HTMLParagraphElement;
        expect(replyContent.textContent).toBe(reply.content);
    });

    it('Should verify the date of the reply', async () => {
        const reply = makeReportReply();
        ReactTestUtils.act(() => {
            render(<Reply reply={reply} />, container);
        });
        const repliedOn = document.querySelector('#replied-on') as HTMLHeadElement;
        expect(repliedOn.textContent).toBe(formatDate(new Date(reply.meta.createdAt)));
    });

    it('Should verify the names of the submitter of reply', async () => {
        const reply = makeReportReply();
        const { first, last } = reply.meta.createdBy.name;

        ReactTestUtils.act(() => {
            render(<Reply reply={reply} />, container);
        });

        const repliedBy = document.querySelector('#replied-by') as HTMLHeadElement;
        expect(repliedBy.textContent).toBe(`${first} ${last}`);
    });
});
