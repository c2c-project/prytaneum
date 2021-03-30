/* eslint-disable @typescript-eslint/require-await */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { AxiosResponse } from 'axios';
import { makeUser } from 'prytaneum-typings';

import ThemeProvider from 'contexts/Theme';
import UserProvider from 'contexts/User';
import UserProfile from './UserProfile';
import API from '../../Auth/api';

jest.mock('hooks/useSnack');
jest.mock('utils/axios');

describe('UserProfile', () => {
    let container: HTMLElement | null = null;

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
    it('should render', async () => {
        ReactTestUtils.act(() => {
            render(
                <ThemeProvider>
                    <UserProvider forceNoLogin value={makeUser()}>
                        <UserProfile id='profileRenderTest' />
                    </UserProvider>
                </ThemeProvider>,
                container
            );
        });
        expect(document.getElementById('profileRenderTest')).toBeTruthy();
    });

    // it('should change first name and succeed', async () => {
    //     const sucResp: AxiosResponse = {
    //         status: 200,
    //         data: { user: makeUser() },
    //         headers: {},
    //         config: {},
    //         statusText: '',
    //     };
    //     const nameSpy = jest.spyOn(API, 'changeName').mockResolvedValue(sucResp);
    //     jest.useFakeTimers();
    //     const testName = 'TEST_FIRST';

    //     // render
    //     ReactTestUtils.act(() => {
    //         render(
    //             <ThemeProvider>
    //                 <UserProvider forceNoLogin value={makeUser()}>
    //                     <UserProfile id='profileRenderTest' />
    //                 </UserProvider>
    //             </ThemeProvider>,
    //             container
    //         );
    //     });

    //     const fName = document.querySelector('#fName') as HTMLElement;
    //     // change to test name
    //     ReactTestUtils.act(() => {
    //         ReactTestUtils.Simulate.change(fName, {
    //             target: ({ value: testName } as unknown) as EventTarget,
    //         });
    //     });
    //     // press enter to submit change
    //     ReactTestUtils.act(() => {
    //         ReactTestUtils.Simulate.keyDown(fName, { key: 'Enter', keyCode: 13, which: 13 });
    //         fName.dispatchEvent(new KeyboardEvent('keyDown', { key: 'Enter' }));
    //     });

    //     jest.runAllTimers();

    //     await ReactTestUtils.act(async () => {
    //         await Promise.allSettled(nameSpy.mock.results);
    //     });
    // });

    // it('should change first name and fail', async () => {

    // });

    // it('should change last name and succeed', async () => {

    // });

    // it('should change last name and fail', async () => {

    // });

    // it('should change email and succeed', async () => {

    // });

    // it('should change email and fail', async () => {

    // });
});
