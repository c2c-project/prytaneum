import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Paper from './Paper';
import { ThemeProvider } from '@material-ui/core';
import theme from 'theme';

describe('Paper', () => {
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
            render(
                <ThemeProvider theme={theme}>
                    <div id='test'>
                        <Paper>
                            <h1>Child</h1>
                            <h2>child2</h2>
                        </Paper>
                    </div>
                </ThemeProvider>,
                container
            );
        });
        expect(document.getElementById('test')).toBeTruthy();
    });
});
