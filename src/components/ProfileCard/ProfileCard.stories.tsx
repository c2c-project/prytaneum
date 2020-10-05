import React from 'react';
import Container from '@material-ui/core/Container';
import faker from 'faker';

import { ReferenceNames } from 'types';
import Component from '.';

export default {
    title: 'Components/ProfileCard',
    component: Component,
};

const dummyTeamMember = {
    picturePath: faker.image.avatar(),
    fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    description: faker.lorem.paragraph(2),
    subtitle: faker.random.words(2),
    startDate: faker.date.recent().toISOString(),
    endDate: faker.date.future().toISOString(),
    references: [
        {
            name: 'Github' as ReferenceNames,
            link: 'https://github.com',
        },
        {
            name: 'LinkedIn' as ReferenceNames,
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
