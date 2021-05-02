import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { makeUser } from 'prytaneum-typings';
import ReactTestUtils from 'react-dom/test-utils';
import ThemeProvider from '@local/contexts/Theme';
import UserProvider from '@local/contexts/User';

import UserSettings from './UserSettings';

jest.mock('@local/hooks/useSnack');
jest.mock('@local/utils/axios');

describe('UserSettings', () => {
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
                <ThemeProvider>
                    <UserProvider forceNoLogin value={makeUser()}>
                        <UserSettings id='test' />
                    </UserProvider>
                </ThemeProvider>,
                container
            );
        });
        expect(document.getElementById('test')).toBeTruthy();
    });
});
