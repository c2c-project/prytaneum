import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { makeUser } from 'mock/handlers/adminDashboard';
import UserTags from './UserTags';

/* 
    Rendering Component 
    Just checking if component render correctly
    PropTypes does rest of checking
*/

const userTags = makeUser().status.map((stat) => stat.role);

let container: HTMLDivElement | null;
beforeEach(() => {
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

describe('<UserTags/> rendering', () => {
    // eslint-disable-next-line jest/expect-expect
    it('renders Tags correctly', () => {
        ReactTestUtils.act(() => {
            render(
                <UserTags tags={userTags} primaryHeader='User Tags' />,
                container
            );
        });
    });
});
