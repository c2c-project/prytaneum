import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper, Grid, Button } from '@material-ui/core';

import useEndpoint from 'hooks/useEndpoint';
import { promoteUser } from 'domains/AdminDashboard/api/api';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
    },
    paper: {
        paddingTop: '25vh',
        height: '100%',
    },
}));

interface Props {
    promotionOptions: string[];
}

const UserPromotion = ({ promotionOptions }: Props) => {
    const classes = useStyles();

    const options = promotionOptions.map((option) => (
        <Grid xs={12} item key={option}>
            <Button onClick={() => {}} variant='outlined' fullWidth>
                PROMOTE to {option.toUpperCase()}
            </Button>
        </Grid>
    ));
    return (
        <Container maxWidth='md' className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container justify='center' spacing={2}>
                    {options}
                </Grid>
            </Paper>
        </Container>
    );
};

export default UserPromotion;
