import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import DropDown from './MoCDropDown';

describe('MoCDropDown', () => {
    let container: HTMLElement | null = null;

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
            render(<DropDown />, container);
        });
    });

    it('should change state appropriately', () => {
        // initial render
        ReactTestUtils.act(() => {
            render(<DropDown />, container);
        });

        // find fields

        const selection = document.querySelector(
            '#selectField'
        ) as HTMLSelectElement;
        const nameField = document.querySelector(
            '#standard-premium'
        ) as HTMLInputElement;

        // expect them to be initially empty

        expect(selection.value).toBe('');
        expect(nameField.value).toBe('');

        // change the fields
        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(selection, {
                target: ({ value: 'House' } as unknown) as EventTarget,
            });
            ReactTestUtils.Simulate.change(nameField, {
                target: ({ value: 'Jack' } as unknown) as EventTarget,
            });
        });

        // expect them to reflect the changed values
        expect(selection.value).toBe('House');
        expect(nameField.value).toBe('Jack');

        ReactTestUtils.act(() => {
            ReactTestUtils.Simulate.change(selection, {
                target: ({ value: 'Senate' } as unknown) as EventTarget,
            });
        });
        expect(selection.value).toBe('Senate');
    });
});
