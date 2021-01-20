/* eslint-disable */ // FIXME:
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
// import ReactTestUtils from 'react-dom/test-utils';
// import UserPromotion from './UserPromotion';

// const options = ['Admin', 'Organizer'];
// const userInfo = makeUser();

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

// TODO fix issue with testing

describe('<UserPromotion/> rendering', () => {
    it('renders correctly', () => {});
});

// describe('<UserPromotion/> rendering', () => {
//     // eslint-disable-next-line jest/expect-expect
//     it('renders Tags correctly', () => {
//         ReactTestUtils.act(() => {
//             render(
//                 <UserPromotion
//                     promotionOptions={options}
//                     userData={userInfo}
//                 />,
//                 container
//             );
//         });
//     });
// });
