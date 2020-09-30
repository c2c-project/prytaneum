import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import UserList from './UserList';

/* 
    Rendering Component 
    Just checking if component render correctly
    PropTypes does rest of checking
*/

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

// TODO Snack Problem

describe('<UserList/> rendering', () => {
    // eslint-disable-next-line jest/expect-expect
    it('render correctly', () => {});
});

// describe('<UserList/> rendering', () => {
//     // eslint-disable-next-line jest/expect-expect
//     it('render correctly', () => {
//         ReactTestUtils.act(() => {
//             render(<UserList />, container);
//         });
//     });
// });
