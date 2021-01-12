import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { handleNavigation } from 'utils/history';

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
                onClick={handleNavigation('/login')}
            >
                Login
            </Button>
            <Button
                color='primary'
                variant='outlined'
                onClick={handleNavigation('/register')}
            >
                Sign Up
            </Button>
        </>
    );
}
