import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import ThemeProvider from 'contexts/Theme';
import UserProvider from 'contexts/User';
import { makeUser } from 'prytaneum-typings';

import Login from './Login';

jest.mock('hooks/useSnack');
jest.mock('utils/axios');

describe('Login', () => {
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

    // eslint-disable-next-line jest/expect-expect
    it('should render', () => {
        ReactTestUtils.act(() => {
            render(
                <UserProvider forceNoLogin value={makeUser()}>
                    <ThemeProvider>
                        <Login onLogin={() => {}} />
                    </ThemeProvider>
                </UserProvider>,
                container
            );
        });
    });
});
