import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import TooltipIconButton from './TooltipIconButton';

describe('TooltipIconButton', () => {
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
        const onClickButton = jest.fn();
        ReactTestUtils.act(() => {
            render(
                <TooltipIconButton onClick={onClickButton} tooltip='tooltip'>
                    <h1>Child</h1>
                </TooltipIconButton>,
                container
            );
        });

        const button = document.querySelector('button') as HTMLButtonElement;
        ReactTestUtils.act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(onClickButton).toBeCalledTimes(1);
    });
    // eslint-disable-next-line jest/no-commented-out-tests
    // it('should call onClose when close button is clicked', () => {
    //     const onClose = jest.fn();
    //     ReactTestUtils.act(() => {
    //         render(
    //             <Dialog open onClose={onClose}>
    //                 <div />
    //             </Dialog>,
    //             container
    //         );
    //     });
    //     const button = document.querySelector('button') as HTMLButtonElement;
    //     ReactTestUtils.act(() => {
    //         button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    //     });

    //     expect(onClose).toBeCalledTimes(1);
    // });

    // eslint-disable-next-line jest/no-commented-out-tests
    // it('should not render children if closed', () => {
    //     const onClose = jest.fn();
    //     ReactTestUtils.act(() => {
    //         render(
    //             <Dialog open={false} onClose={onClose}>
    //                 <div id='child' />
    //             </Dialog>,
    //             container
    //         );
    //     });
    //     const child = document.querySelector('#child');
    //     expect(child).toBeFalsy();
    // });
});
