import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import AdminToolbar from './AdminToolbar';

let container: HTMLDivElement | null = null;

jest.mock('hooks/useSnack');

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

describe('<AdminToolbar/> rendering', () => {
    // eslint-disable-next-line jest/expect-expect
    it('renders correctly', () => {
        const onLoadUsers = jest.fn();
        const setLoading = jest.fn();
        ReactTestUtils.act(() => {
            render(
                <AdminToolbar
                    onLoadUsers={onLoadUsers}
                    setLoading={setLoading}
                />,
                container
            );
        });
    });
});
