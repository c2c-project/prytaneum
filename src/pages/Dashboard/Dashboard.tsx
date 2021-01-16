/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import TitleCard from 'components/TitleCard';
import FadeThrough from 'components/FadeThrough';
import RequireRoles from 'domains/Logical/RequireRoles';
import RoleInvite from 'domains/Admin/RoleInvite';

const useStyles = makeStyles((theme) => ({
    item: {
        margin: theme.spacing(0, 0, 4, 0),
    },
}));

export default function Dashboard() {
    const classes = useStyles();
    return (
        <FadeThrough animKey='dashboard-page'>
            <Grid container>
                <TitleCard title='Dashboard' />
                <Grid item xs={12} className={classes.item}>
                    <Card
                        style={{
                            minHeight: 500,
                            display: 'flex',
                        }}
                    >
                        <CardContent
                            style={{
                                display: 'flex',
                                flex: '1 1 100%',
                                alignItems: 'center',
                            }}
                        >
                            <Grid item xs={12}>
                                <Typography variant='h4' align='center'>
                                    This area is still under construction!
                                </Typography>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <RequireRoles requiredRoles={['admin']} redirect={false}>
                    <Grid className={classes.item} item xs={12}>
                        <RoleInvite />
                    </Grid>
                </RequireRoles>
            </Grid>
        </FadeThrough>
    );
}
