import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import ReactTestUtils from 'react-dom/test-utils';
import { ThemeProvider } from '@local/core';

import { Loader } from './Loader';

describe('Loader', () => {
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
                <StyledEngineProvider injectFirst>
                    <ThemeProvider>
                        <div id='test'>
                            <Loader />
                        </div>
                    </ThemeProvider>
                </StyledEngineProvider>,
                container
            );
        });
        expect(document.getElementById('test')).toBeTruthy();
    });
});
