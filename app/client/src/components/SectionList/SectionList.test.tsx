/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
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
                href: '/test',
            },
            {
                image: 'https://i.imgur.com/3beQH5s.jpeg',
                title: 'Leia Organa',
                subtitle: 'Automation in the Workforce',
                href: '/test',
            },
            {
                image: 'https://i.imgur.com/3beQH5s.jpeg',
                title: 'Leia Organa',
                subtitle: 'Automation in the Workforce',
                href: '/test',
            },
            {
                image: 'https://i.imgur.com/3beQH5s.jpeg',
                title: 'Leia Organa',
                subtitle: 'Automation in the Workforce',
                href: '/test',
            },
            {
                image: 'https://i.imgur.com/3beQH5s.jpeg',
                title: 'Leia Organa',
                subtitle: 'Automation in the Workforce',
                href: '/test',
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
                href: '/test',
            },
            {
                image: 'https://i.imgur.com/3beQH5s.jpeg',
                title: 'Leia Organa',
                subtitle: 'Automation in the Workforce',
                href: '/test',
            },
            {
                image: 'https://i.imgur.com/3beQH5s.jpeg',
                title: 'Leia Organa',
                subtitle: 'Automation in the Workforce',
                href: '/test',
            },
            {
                image: 'https://i.imgur.com/3beQH5s.jpeg',
                title: 'Leia Organa',
                subtitle: 'Automation in the Workforce',
                href: '/test',
            },
            {
                image: 'https://i.imgur.com/3beQH5s.jpeg',
                title: 'Leia Organa',
                subtitle: 'Automation in the Workforce',
                href: '/test',
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
