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
    subtitle: faker.random.words(2),
    startDate: faker.date.recent(),
    endDate: faker.date.future(),
});

const makeTeam = (num: number) => {
    const teamMembers = [];
    const linkedIn = { icon: <LinkedInIcon />, name: 'LinkedIn', link: 'https://www.linkedin.com' };
    const email = { icon: <EmailIcon />, name: 'Email', link: 'https://www.gmail.com' };
    for (let i = 0; i < num; i += 1) {
        const tempMem = makeBaseTeam();
        teamMembers.push({
            ...tempMem,
            picturePath: faker.image.imageUrl(),
            // this is just creating a copy of linkedIn or email object each time
            references:  i % 2 === 0 ? [{ ...linkedIn }] : [{ ...email }] 
        });
    }    
    return {
        name: faker.company.companyName(),
        members: teamMembers,
    };
};

export function Team() {
    return (
        <Container>
            <Component team={makeTeam(8)} />
        </Container>
    );
}
