import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import ListCell from './ListCell';

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

describe('<ListCell/> rendering', () => {
    it('renders correctly', () => {
        ReactTestUtils.act(() => {
            render(
                <ListCell primary='Kiki Wapos' secondary='Admin' />,
                container
            );
        });
        expect(container?.querySelector('span')?.textContent).toBe(
            'Kiki Wapos'
        );
    });

    it('it should render secondary', () => {
        ReactTestUtils.act(() => {
            render(
                <ListCell primary='Kiki Wapos' secondary='Admin' />,
                container
            );
        });
        expect(container?.querySelector('p')?.textContent).toBe('Admin');
    });
});
