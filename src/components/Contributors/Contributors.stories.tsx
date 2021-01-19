import React from 'react';
import { Meta } from '@storybook/react';
import faker from 'faker/locale/en';

import { ReferenceNames } from 'types';
import Component from '.';

export default {
    title: 'Components/Contributors',
    component: Component,
    parameters: {
        layout: 'centered',
    },
} as Meta;

// TODO: move this to prytaneum typings
const makeBaseTeam = () => ({
    fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    description: faker.lorem.paragraph(),
    subtitle: faker.random.words(2),
    startDate: faker.date.recent().toISOString(),
    endDate: faker.date.future().toISOString(),
});

const makeTeam = (num: number) => {
    const teamMembers = [];
    const linkedIn = {
        name: 'LinkedIn' as ReferenceNames,
        link: 'https://www.linkedin.com',
    };
    const email = {
        name: 'email' as ReferenceNames,
        link: 'https://www.gmail.com',
    };
    for (let i = 0; i < num; i += 1) {
        const tempMem = makeBaseTeam();
        teamMembers.push({
            ...tempMem,
            picturePath: faker.image.imageUrl(),
            references: i % 2 === 0 ? [linkedIn] : [email],
        });
    }
    return {
        name: faker.company.companyName(),
        members: teamMembers,
    };
};

export function Contributors() {
    return <Component team={makeTeam(35)} maxDisplayCount={10} />;
}
