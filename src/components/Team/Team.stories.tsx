import React from 'react';
import Container from '@material-ui/core/Container';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';
import faker from 'faker';
import Component from '.';

export default {
    title: 'Components/Team',
    component: Component,
};

const makeBaseTeam = () => ({
    fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    description: faker.lorem.paragraph(),
});

const makeTeam = (num: number) => {
    const team = [];
    for (let i = 0; i < num; i += 1) {
        const tempMem = makeBaseTeam();
        if (i % 2 === 0) {
            team.push({
                ...tempMem,
                picturePath: faker.image.imageUrl(),
                references: [
                    {
                        icon: <LinkedInIcon />,
                        name: 'LinkedIn',
                        link: 'https://www.linkedin.com',
                    },
                ],
            });
        } else {
            team.push({
                ...tempMem,
                picturePath: faker.image.imageUrl(),
                references: [
                    {
                        icon: <EmailIcon />,
                        name: 'Email',
                        link: 'https://www.gmail.com',
                    },
                ],
            });
        }
    }
    return team;
};

export function Team() {
    return (
        <Container>
            <Component teamMembers={makeTeam(8)} />
        </Container>
    );
}
