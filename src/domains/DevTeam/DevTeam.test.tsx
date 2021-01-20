/* eslint-disable */ // FIXME:
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { AxiosResponse } from 'axios';

import DevTeam from './DevTeam';
import * as API from './api/api'; // babel issues ref: https://stackoverflow.com/questions/53162001/typeerror-during-jests-spyon-cannot-set-property-getrequest-of-object-which

jest.mock('hooks/useSnack');

describe('DevTeam', () => {
    let container: HTMLDivElement | null = null;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        if (container) {
            unmountComponentAtNode(container);
            container.remove();
        }
        container = null;
        jest.restoreAllMocks();
    });

    // eslint-disable-next-line jest/expect-expect
    it('should DevTeam component', async () => {
        ReactTestUtils.act(() => {
            render(<DevTeam />, container);
        });
    });
    // FIXME: These tests do not pass because DevTeam component gets data from a mock API when is mounted.
    // However, I believe mocks don't work in tests. So undefined data is returned which makes rendering the component throw an error.
    // it('should get devTeam data', async () => {
    //     const resolvedVal: AxiosResponse = {
    //         status: 200,
    //         data: {},
    //         statusText: 'OK',
    //         headers: {},
    //         config: {},
    //     };
    //     const spy = jest
    //         .spyOn(API, 'getDevTeams')
    //         .mockResolvedValue(resolvedVal);

    //     jest.useFakeTimers();
    //     ReactTestUtils.act(() => {
    //         render(<DevTeam />, container);
    //     });

    //     expect(spy).toBeCalledTimes(1);
    //     jest.runAllTimers();
    //     await ReactTestUtils.act(async () => {
    //         await Promise.allSettled(spy.mock.results);
    //     });
    // });

    // it('should submit and fail', async () => {
    //     const rejectedVal = { status: 500 };
    //     const spy = jest
    //         .spyOn(API, 'getDevTeams')
    //         .mockRejectedValue(rejectedVal);

    //     jest.useFakeTimers();

    //     ReactTestUtils.act(() => {
    //         render(<DevTeam />, container);
    //     });

    //     expect(spy).toBeCalledTimes(1);
    //     jest.runAllTimers();
    //     await ReactTestUtils.act(async () => {
    //         await Promise.allSettled(spy.mock.results);
    //     });
    // });
});
