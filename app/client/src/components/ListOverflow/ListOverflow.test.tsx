import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { makeUsers } from 'mock/handlers/auth';
import ListOverflow from './ListOverflow';

const usersPrimary = makeUsers(2).map((user) => {
    return { _id: user._id, primary: user.email.address };
});

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

describe('<ListOverflow/> rendering', () => {
    // eslint-disable-next-line jest/expect-expect
    it('renders correctly', () => {
        ReactTestUtils.act(() => {
            render(<ListOverflow rowProps={usersPrimary} />, container);
        });
    });
});
