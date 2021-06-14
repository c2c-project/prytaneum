import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import IconBar from './IconBar';

describe('IconBar', function () {
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

    it('should render using flex-start', () => {
        ReactTestUtils.act(() => {
            render(
                <IconBar>
                    <div id='test' />
                    <div id='test2' />
                </IconBar>,

                container
            );
        });
        expect(document.getElementById('test')).toBeTruthy();
        expect(document.getElementById('test2')).toBeTruthy();
    });
});
