import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { makeUser } from 'mock/handlers/adminDashboard';
import UserActionHistory from './UserActionHistory';

/* 
    Rendering Component 
    Just checking if component render correctly
    PropTypes does rest of checking
*/

const userActionHistory = makeUser().actionHistoryData.map((user) => {
    return {
        _id: user.timeStamp.toString(),
        primary: user.action,
        secondary: user.timeStamp.toString(),
    };
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

describe('<UserActionHistory/> rendering', () => {
    // eslint-disable-next-line jest/expect-expect
    it('render correctly', () => {
        ReactTestUtils.act(() => {
            render(
                <UserActionHistory ListsTraits={userActionHistory} />,
                container
            );
        });
    });
});
