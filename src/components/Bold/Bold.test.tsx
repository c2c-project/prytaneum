import React, { Children } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Bold from './Bold';

describe('Bold', function() {
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

    it('should render', () => {
        const children = "hi";
        ReactTestUtils.act(() => {
            render(
                <Bold>
                    <div id='test'/>
                </Bold>,
                container
            )
        });
        expect(document.getElementById('test')).toBeTruthy();
    });

}); 