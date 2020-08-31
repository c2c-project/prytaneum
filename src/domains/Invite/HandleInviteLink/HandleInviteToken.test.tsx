/* eslint-disable @typescript-eslint/require-await */
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import jwt from 'jsonwebtoken';

import HandleInviteToken from './HandleInviteToken';

jest.mock('hooks/useSnack');
jest.mock('hooks/useEndpoint');

describe('Handle Invite Token', () => {
    let container: HTMLElement | null = null;
    const testToken = jwt.sign({ email: 'test@test.com' }, 'secret');

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
                <HandleInviteToken
                    onSuccess={() => {}}
                    onFailure={() => {}}
                    token={testToken}
                />,
                container
            );
        });
    });
});
