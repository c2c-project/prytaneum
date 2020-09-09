import React from 'react';
import Container from '@material-ui/core/Container';
import faker from 'faker';
import Component from '.';

export default {
    title: 'Components/Contributors',
    component: Component,
};

const makeBaseTeam = () => ({
    fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    description: faker.lorem.paragraph(),
    subtitle: faker.random.words(2),
    startDate: faker.date.recent(),
    endDate: faker.date.future(),
});

const makeTeam = (num: number) => {
    const teamMembers = [];
    for (let i = 0; i < num; i += 1) {
        const tempMem = makeBaseTeam();
        if (i % 2 === 0) {
            teamMembers.push({
                ...tempMem,
                picturePath: faker.image.imageUrl(),
                references: [
                    {
                        icon: <></>,
                        name: 'LinkedIn',
                        link: 'https://www.linkedin.com',
                    },
                ],
            });
        } else {
            teamMembers.push({
                ...tempMem,
                picturePath: faker.image.imageUrl(),
                references: [
                    {
                        icon: <></>,
                        name: 'Email',
                        link: 'https://www.gmail.com',
                    },
                ],
            });
        }
    }
    return {
        name: faker.company.companyName(),
        members: teamMembers,
    };
};

export function Contributors() {
    return (
        <Container>
            <Component team={makeTeam(35)} />
        </Container>
    );
}
