import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from 'theme';
import ForgotPassRequest from './ForgotPassRequest';

jest.mock('hooks/useSnack');
jest.mock('utils/axios');

describe('Register', () => {
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
                    <ForgotPassRequest />
                </ThemeProvider>,
                container
            );
        });
    });
});
