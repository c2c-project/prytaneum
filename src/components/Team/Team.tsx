/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { teamMember as teamMemberType } from './types';
import ProfileCard from '../ProfileCard';

interface Props {
    teamMembers: teamMemberType[];
}
export default function Team({ teamMembers }: Props) {
    return (
        <Grid container direction='row' alignItems='center' spacing={2}>
            {teamMembers.map((teamMember, index) => (
                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <ProfileCard key={index} teamMember={teamMember} />
                </Grid>
            ))}
        </Grid>
    );
}
