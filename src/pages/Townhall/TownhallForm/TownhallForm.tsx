import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import TownhallFormComponent from 'domains/Townhall/TownhallForm';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            boxShadow: theme.shadows[10],
            margin: theme.spacing(3, 0),
        },
        [theme.breakpoints.down('sm')]: {
            borderRadius: 0,
            height: '100%',
        },
    },
}));

export default function TownhallFormPage() {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <TownhallFormComponent />
        </Paper>
    );
}
