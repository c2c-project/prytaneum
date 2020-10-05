/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { Team as TeamType } from 'types';
import ProfileCard from '../ProfileCard';

interface Props {
    team: TeamType;
}
export default function Team({ team }: Props) {
    return (
        <Grid container alignItems='center' spacing={3}>
            <Grid container item justify='center'>
                <Typography align='center' variant='h5'>
                    {team.name}
                </Typography>
            </Grid>
            {team.members.map((teamMember, index) => (
                <Grid
                    item
                    container
                    justify='center'
                    xs={12}
                    sm={6}
                    md={6}
                    lg={3}
                    key={index}
                >
                    <ProfileCard key={index} teamMember={teamMember} />
                </Grid>
            ))}
        </Grid>
    );
}
