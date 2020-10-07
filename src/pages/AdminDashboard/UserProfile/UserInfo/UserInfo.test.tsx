import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { makeUser } from 'mock/handlers/auth';
import UserInfo from './UserInfo';

/* 
    Rendering Component 
    Just checking if component render correctly
    PropTypes does rest of checking
*/

const filterList = ['Attended', 'Moderator', 'Banned'];
const userInfo = makeUser();

const profileInfo = {
    primary: userInfo.name,
    info: userInfo.status.filter((x) => filterList.includes(x.role)),
};

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

describe('<UserInfo/> rendering', () => {
    // eslint-disable-next-line jest/expect-expect
    it('renders correctly', () => {
        ReactTestUtils.act(() => {
            render(<UserInfo profileInfo={profileInfo} />, container);
        });
    });
});
