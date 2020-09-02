import React from 'react';
import Container from '@material-ui/core/Container';
import GithubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import faker from 'faker';

import Component from '.';

export default {
    title: 'Components/ProfileCard',
    component: Component,
};

const dummyTeamMember = {
    picturePath: faker.image.avatar(),
    fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    description: faker.lorem.paragraph(2),
    references: [
        {
            icon: <GithubIcon />,
            name: 'Github',
            link: 'https://github.com',
        },
        {
            icon: <LinkedInIcon />,
            name: 'LinkedIn',
            link: 'https://www.linkedin.com',
        },
    ],
};

export function ProfileCard() {
    return (
        <Container maxWidth='sm'>
            <Component teamMember={dummyTeamMember} />
        </Container>
    );
}
