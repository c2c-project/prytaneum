import React, { Children } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import MessageItemAuthor from './MessageItemAuthor';

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
        const name = "toTest";
        ReactTestUtils.act(() => {
            render(
                <div id='MessageItemAuthor'>
                    <MessageItemAuthor name={name} />
                </div>,
                container
            )
        });
        expect(document.getElementById('MessageItemAuthor')).toBeTruthy();
    });

});
