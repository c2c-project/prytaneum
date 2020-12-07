import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Component, { TownHallHistoryEntry } from './SpeakerHistory';

const entries: TownHallHistoryEntry[] = [
    {
        action: 'Event 1',
        link: 'https://i.imgur.com/3beQH5s.jpeg',
        date: 'Jan 9, 2014',
    },
    {
        action: 'Event 2',
        link: 'https://i.imgur.com/3beQH5s.jpeg',
        date: 'Jan 10, 2015',
    },
    {
        action: 'Event 3',
        link: 'https://i.imgur.com/3beQH5s.jpeg',
        date: 'Jan 11, 2016',
    },
    {
        action: 'Event 4',
        link: 'https://i.imgur.com/3beQH5s.jpeg',
        date: 'Jan 12, 2017',
    },
];

describe('Speaker History', function () {
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
            render(<Component history={entries} />, container);
        });
    });
});
