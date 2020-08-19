import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import MessageList from './MessageList';
import { ThemeProvider } from '@material-ui/core';
import theme from 'theme';

describe('MessageList', () => {
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
        const children = <h1>test</h1>;
        ReactTestUtils.act(() => {
            render(
                <ThemeProvider theme={theme}>
                    <div id='test'>
                        <MessageList>
                            <h1>Child</h1>
                            <h2>child2</h2>
                        </MessageList>
                    </div>
                </ThemeProvider>,
                container
            );
        });
        expect(document.getElementById('test')).toBeTruthy();
    });
});
