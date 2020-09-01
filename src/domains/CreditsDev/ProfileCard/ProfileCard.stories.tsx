import React from 'react';
import Container from '@material-ui/core/Container';
import faker from 'faker';

import Component from '.';

export default {
    title: 'CreditsDev/ProfileCard',
    component: Component,
};

const dummyProfile = {
    pictureUrl: faker.image.avatar(),
    fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    description: faker.lorem.paragraph(2),
    githubLink: 'https://github.com/johan1505',
    linkedInLink: 'https://www.linkedin.com/in/johan-guzman-b37101181/',
};

export function ProfileCard() {
    return (
        <Container maxWidth='sm'>
            <Component
                pictureUrl={dummyProfile.pictureUrl}
                fullName={dummyProfile.fullName}
                description={dummyProfile.description}
                githubLink={dummyProfile.githubLink}
                linkedInLink={dummyProfile.linkedInLink}
            />
        </Container>
    );
}
