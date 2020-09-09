/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { teamMember as teamMemberType } from './types';
import ProfileCard from '../ProfileCard';

interface Team {
    name: string;
    members: teamMemberType[];
}
interface Props {
    team: Team;
}
export default function Team({ team }: Props) {
    return (
        <Grid container direction='row' alignItems='center' spacing={2}>
            <Grid container item direction='row' justify='center'>
                <Grid item>
                    <Typography align='center' variant='h5'>
                        {team.name}
                    </Typography>
                </Grid>
            </Grid>
            {team.members.map((teamMember, index) => (
                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <ProfileCard key={index} teamMember={teamMember} />
                </Grid>
            ))}
        </Grid>
    );
}
