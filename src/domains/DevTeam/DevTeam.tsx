import React from 'react';
import { Grid, Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Team from 'components/Team';
import Loader from 'components/Loader';
import useEndpoint from 'hooks/useEndpoint';
import useSnack from 'hooks/useSnack';
import { Team as TeamType } from 'types';
import { getDevTeams } from './api';

const useStyles = makeStyles((theme) => ({
    gutter: {
        marginBottom: theme.spacing(5),
    },
}));

export default function DevTeam() {
    const classes = useStyles();
    const [devTeam, setDevTeam] = React.useState<TeamType[]>([]);
    const apiRequest = React.useCallback(() => getDevTeams(), []);
    const [snack] = useSnack();
    const [, isLoading] = useEndpoint(apiRequest, {
        onSuccess: (results) => {
            setDevTeam(results.data.devTeam);
        },
        onFailure: () => snack('Something went wrong, please try again'),
        runOnFirstRender: true,
    });

    if (isLoading) return <Loader />;

    return (
        <Grid container alignContent='flex-start'>
            <Grid item xs={12}>
                <Typography variant='h4' align='center'>
                    Lab Research Team
                </Typography>
            </Grid>
            {devTeam.map((subTeam, index) => (
                <Grid item xs={12} key={index} className={classes.gutter}>
                    <Divider className={classes.gutter} variant='middle' />
                    <Team team={subTeam} />
                </Grid>
            ))}
        </Grid>
    );
}
