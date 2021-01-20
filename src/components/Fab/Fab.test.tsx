import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Fab from './Fab';

describe('Fab', function () {
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
        const onClick = jest.fn();
        ReactTestUtils.act(() => {
            render(
                <div id='fab'>
                    <Fab onClick={onClick}>
                        <h1>+</h1>
                    </Fab>
                </div>,
                container
            );
        });
        expect(document.getElementById('fab')).toBeTruthy();
    });
});
