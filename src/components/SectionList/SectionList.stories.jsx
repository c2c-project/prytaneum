import React from 'react';
import Container from '@material-ui/core/Container';

import Component from '.';

export default { title: 'Components' };

const sections = [
    {
        title: 'Section 1',
        sectionData: [
            {
                image: 'https://i.imgur.com/3beQH5s.jpeg',
                title: 'Leia Organa',
                subtitle:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eu ultrices vitae auctor. Id eu nisl nunc mi ipsum. Tempor orci eu lobortis elementum nibh tellus. Amet facilisis magna etiam tempor orci eu lobortis eleme  melementum  ...',
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
        <Container maxWidth='md' style={{ width: '100%', height: '100%' }}>
            <Component sections={sections} />
        </Container>
    );
}
