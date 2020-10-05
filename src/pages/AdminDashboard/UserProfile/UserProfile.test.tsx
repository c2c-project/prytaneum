import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { MemoryRouter, Route } from 'react-router-dom';
import ReactTestUtils from 'react-dom/test-utils';
import UserProfile from './UserProfile';

jest.mock('hooks/useSnack');
jest.mock('utils/axios');

/* 
    Rendering Component 
    Just checking if component render correctly
    PropTypes does rest of checking
*/

let container: HTMLDivElement | null;

const OLD_ENV = process.env;

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
    jest.resetModules();
    process.env = { ...OLD_ENV }; // make a copy
});

describe('<UserInfo/> rendering', () => {
    let _location = { pathname: '' };

    it('renders correctly', () => {
        ReactTestUtils.act(() => {
            render(
                <MemoryRouter initialEntries={['/123456']}>
                    <Route
                        path='/:userId'
                        render={({ location }) => {
                            _location = location;
                            return null;
                        }}
                    >
                        <UserProfile />
                    </Route>
                </MemoryRouter>,
                container
            );
        });

        expect(_location.pathname).toBe('');
    });
});
