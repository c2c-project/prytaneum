/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import SectionList from './SectionList';

const sections = [
    {
        title: 'Section 1',
        sectionData: [
            {
                image: 'https://i.imgur.com/3beQH5s.jpeg',
                title: 'Leia Organa',
                subtitle: 'Automation in the Workforce',
            },
            {
                image: 'https://i.imgur.com/3beQH5s.jpeg',
                title: 'Leia Organa',
                subtitle: 'Automation in the Workforce',
            },
            {
                image: 'https://i.imgur.com/3beQH5s.jpeg',
                title: 'Leia Organa',
                subtitle: 'Automation in the Workforce',
            },
            {
                image: 'https://i.imgur.com/3beQH5s.jpeg',
                title: 'Leia Organa',
                subtitle: 'Automation in the Workforce',
            },
            {
                image: 'https://i.imgur.com/3beQH5s.jpeg',
                title: 'Leia Organa',
                subtitle: 'Automation in the Workforce',
            },
        ],
    },
    {
        title: 'Section 2',
        sectionData: [
            {
                image: 'https://i.imgur.com/3beQH5s.jpeg',
                title: 'Leia Organa',
                subtitle: 'Automation in the Workforce',
            },
            {
                image: 'https://i.imgur.com/3beQH5s.jpeg',
                title: 'Leia Organa',
                subtitle: 'Automation in the Workforce',
            },
            {
                image: 'https://i.imgur.com/3beQH5s.jpeg',
                title: 'Leia Organa',
                subtitle: 'Automation in the Workforce',
            },
            {
                image: 'https://i.imgur.com/3beQH5s.jpeg',
                title: 'Leia Organa',
                subtitle: 'Automation in the Workforce',
            },
            {
                image: 'https://i.imgur.com/3beQH5s.jpeg',
                title: 'Leia Organa',
                subtitle: 'Automation in the Workforce',
            },
        ],
    },
];

describe('Dialog', function () {
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
            render(<SectionList sections={sections} />, container);
        });
    });
});
