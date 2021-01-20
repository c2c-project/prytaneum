import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import ThemeProvider from 'contexts/Theme';

import TextField from './TextField';

describe('TextField', function () {
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

    it('should render AND test if the function is called when the value changes', () => {
        const onClick = jest.fn();
        ReactTestUtils.act(() => {
            render(
                <ThemeProvider>
                    <TextField
                        id='testing'
                        required
                        label='Test Label'
                        value='Test value in the box'
                        onChange={onClick}
                    />
                </ThemeProvider>,
                container
            );
        });

        // find the input field
        const valueNode = document.querySelector('#testing') as HTMLElement;
        const simVal = { v: 'test' };

        // enter in our simVal into the form
        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(valueNode, {
                target: ({ value: simVal.v } as unknown) as EventTarget,
            });
        });

        expect(onClick).toBeCalledTimes(1);
        expect(document.getElementById('testing')).toBeTruthy();
    });
});
