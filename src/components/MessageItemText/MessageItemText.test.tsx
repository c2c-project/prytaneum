import React, { Children } from 'react';
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
        const str = "toTest";
        ReactTestUtils.act(() => {
            render(
                <div id='MessageItemText'>
                    <MessageItemText text={str} />
                </div>,
                container
            )
        });
        expect(document.getElementById('MessageItemText')).toBeTruthy();
    });

});
