import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Title from './Title';

const useStyles = makeStyles((theme) => ({
    item: {
        marginRight: theme.spacing(1),
    },
}));

export default function Public() {
    const classes = useStyles();

    return (
        <>
            <Title />
            <Button
                color='primary'
                variant='contained'
                className={classes.item}
            >
                Login
            </Button>
            <Button color='primary' variant='outlined'>
                Sign Up
            </Button>
        </>
    );
}
