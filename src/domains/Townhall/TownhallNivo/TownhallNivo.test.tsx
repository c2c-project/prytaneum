import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Component, { PieDatum } from './TownhallNivo';

const Nivo: PieDatum[] = [
    {
        id: 'php',
        value: 344,
    },
    {
        id: 'go',
        value: 262,
    },
    {
        id: 'javascript',
        value: 411,
    },
    {
        id: 'ruby',
        value: 191,
    },
    {
        id: 'hack',
        value: 234,
   
    },
];

describe('TownHallNivo', function () {
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
    it('should render', () => {
        ReactTestUtils.act(() => {
            render(<Component data={Nivo} height={200} />, container);
        });
    });
});
