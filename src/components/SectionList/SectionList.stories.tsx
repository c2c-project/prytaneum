import React from 'react';
import Container from '@material-ui/core/Container';

import Component from '.';

export default {
    title: 'Components',
    component: Component,
    parameters: {
        docs: {
            page: () => <h1>Hello world</h1>,
        },
    },
};

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

export function SectionList() {
    return (
        <Container
            maxWidth='md'
            style={{ width: '100%', height: '100%', overflowY: 'scroll' }}
        >
            <Component sections={sections} />
        </Container>
    );
}
