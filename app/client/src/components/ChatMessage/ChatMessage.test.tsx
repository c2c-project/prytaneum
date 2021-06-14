import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import ChatMessage from './ChatMessage';

describe('MessageItemAuthor', function () {
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
        const name = 'toTest';
        ReactTestUtils.act(() => {
            render(
                <div id='MessageItemAuthor'>
                    <ChatMessage name={name} timestamp={Date.now()} message='123' />
                </div>,
                container
            );
        });
        expect(document.getElementById('MessageItemAuthor')).toBeTruthy();
    });
});
