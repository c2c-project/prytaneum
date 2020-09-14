import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import MessageItemText from './MessageItemText';

describe('MessageItemText', function () {
    let container: HTMLDivElement | null = null;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        // cleanup
        if (container) {
            unmountComponentAtNode(container);
            container.remove();
        }
        container = null;
    });

    it('should render', () => {
        const str = 'toTest';
        ReactTestUtils.act(() => {
            render(
                <MessageItemText id='MessageItemTextTest' text={str} />,
                container
            );
        });
        expect(document.getElementById('MessageItemTextTest')).toBeTruthy();
    });
});
