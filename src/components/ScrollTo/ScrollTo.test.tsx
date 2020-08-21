import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from 'theme';
import ScrollTo from './ScrollTo';

describe('ScrollTo', function () {
    let container: HTMLDivElement | null = null;
    const OLD_ENV = process.env;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);

        // clear module registry to clear cache of required ones
        // this is to isolate the local state so when running other tests, we do not conflict
        // https://stackoverflow.com/questions/48033841/test-process-env-with-jest
        jest.resetModules();
        process.env = { ...OLD_ENV }; // make a copy
    });

    afterEach(() => {
        // cleanup
        if (container) {
            unmountComponentAtNode(container);
            container.remove();
        }
        container = null;
        jest.restoreAllMocks();
        process.env = OLD_ENV; // restore old env
    });

    it('should render', () => {
        ReactTestUtils.act(() => {
            render(
                <ThemeProvider theme={theme}>
                    <ScrollTo active={true} direction='top'>
                        <h1 id='testing'>Test</h1>
                    </ScrollTo>
                </ThemeProvider>,
                container
            );
        });
        expect(document.getElementById('testing')).toBeTruthy();
    });
});
