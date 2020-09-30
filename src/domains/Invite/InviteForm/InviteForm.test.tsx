/* eslint-disable @typescript-eslint/require-await */
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { unmountComponentAtNode, render } from 'react-dom';

import InviteForm from '.';

jest.mock('hooks/useSnack');
jest.mock('hooks/useEndpoint');

describe('Invite Form', () => {
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
            render(<InviteForm />, container);
        });
    });
});
