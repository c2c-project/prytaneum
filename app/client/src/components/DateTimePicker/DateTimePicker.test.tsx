/* eslint-disable prefer-arrow-callback */
/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { DateTimePicker } from './DateTimePicker';

describe('DateTimePicker', function () {
    let container: HTMLDivElement | null = null;

    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        // cleanup on exiting
        if (container) {
            unmountComponentAtNode(container);
            container.remove();
        }
        container = null;
        jest.restoreAllMocks();
    });

    // eslint-disable-next-line jest/expect-expect
    it('should render', () => {
        ReactTestUtils.act(() => {
            render(<DateTimePicker id='test' value='test' onChange={() => {}} />, container);
        });
        expect(document.getElementById('test')).toBeTruthy();
    });
});
