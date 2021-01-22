/* eslint-disable @typescript-eslint/require-await */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import faker from 'faker/locale/en';

import { makeBugReport } from '../reportMaker.mock';
import ReportList from './ReportList';

jest.mock('hooks/useSnack');

describe('CreateReportList', () => {
    const dummyBugReport = makeBugReport();
    // Append a letter to the id of the report. This is necessary for jest to be able to query a node by the id attribute
    dummyBugReport._id = `p${faker.random.alphaNumeric(11)}`;
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
    it('should render report list', async () => {
        ReactTestUtils.act(() => {
            render(<ReportList reports={[dummyBugReport]} />, container);
        });
    });

    it('should render and open dialog', async () => {
        const newDescription = faker.lorem.paragraph();

        ReactTestUtils.act(() => {
            render(<ReportList reports={[dummyBugReport]} />, container);
        });

        const ListItemNode = document.querySelector(
            `#${dummyBugReport._id}`
        ) as HTMLInputElement;

        // Open Dialog with Report Summary
        ReactTestUtils.act(() => {
            ListItemNode.dispatchEvent(
                new MouseEvent('click', { bubbles: true })
            );
        });

        // Get report description`
        const reportDescriptionNode = document.querySelector(
            '#report-description'
        ) as HTMLInputElement;

        expect(reportDescriptionNode.value).toBe(dummyBugReport.description);

        // Update Report summary from the dialog
        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(reportDescriptionNode, {
                target: ({ value: newDescription } as unknown) as EventTarget,
            });
        });

        expect(reportDescriptionNode.value).toBe(newDescription);
    });
});
