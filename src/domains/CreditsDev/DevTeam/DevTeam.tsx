import React from 'react';
import Grid from '@material-ui/core/Grid';
import faker from 'faker';

import ProfileCard from '../ProfileCard';

const makeTeamMember = () => ({
    pictureUrl: faker.image.avatar(),
    fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    description: 'Some Short description',
    githubLink: 'https://github.com/johan1505',
    linkedInLink: 'https://www.linkedin.com/in/johan-guzman-b37101181/',
});

const makeTeam = (num: number) => {
    const list = [];
    for (let i = 0; i < num; i += 1) {
        list.push(makeTeamMember());
    }
    return list;
};

export default function DevTeam() {
    const team = makeTeam(8);
    return (
        <Grid container direction='row' alignItems='center' spacing={2}>
            {team.map((teamMember, index) => (
                <Grid item xs={4}>
                    <ProfileCard
                        key={index}
                        pictureUrl={teamMember.pictureUrl}
                        fullName={teamMember.fullName}
                        description={teamMember.description}
                        githubLink={teamMember.githubLink}
                        linkedInLink={teamMember.linkedInLink}
                    />
                </Grid>
            ))}
        </Grid>
    );
}
