import * as React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Team as TeamType } from 'types';
import ProfileCard from '../ProfileCard';

interface Props {
    team: TeamType;
}

const useStyles = makeStyles((theme) => ({
    item: { marginBottom: theme.spacing(5) },
}));

export default function Team({ team }: Props) {
    const classes = useStyles();
    return (
        <Grid container>
            <Grid item xs={12} className={classes.item}>
                <Typography align='center' variant='h5'>
                    {team.name}
                </Typography>
            </Grid>
            <Grid item xs={12} container justify='space-around'>
                {team.members.map((teamMember, index) => (
                    <Grid item key={index} className={classes.item}>
                        <ProfileCard key={index} teamMember={teamMember} />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
}
