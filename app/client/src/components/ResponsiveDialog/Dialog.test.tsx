/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import ResponsiveDialog from './ResponsiveDialog';

jest.mock('@material-ui/core/useMediaQuery', () => () => true);

describe('Dialog', function () {
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
                <ResponsiveDialog open onClose={jest.fn()}>
                    <div />
                </ResponsiveDialog>,
                container
            );
        });
    });
    it('should call onClose when close button is clicked', () => {
        const onClose = jest.fn();
        ReactTestUtils.act(() => {
            render(
                <ResponsiveDialog open onClose={onClose}>
                    <div />
                </ResponsiveDialog>,
                container
            );
        });
        const button = document.querySelector(
            '[aria-label="close"]'
        ) as HTMLButtonElement;
        ReactTestUtils.act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(onClose).toBeCalledTimes(1);
    });
    it('should not render children if closed', () => {
        const onClose = jest.fn();
        ReactTestUtils.act(() => {
            render(
                <ResponsiveDialog open={false} onClose={onClose}>
                    <div id='child' />
                </ResponsiveDialog>,
                container
            );
        });
        const child = document.querySelector('#child');
        expect(child).toBeFalsy();
    });
});
