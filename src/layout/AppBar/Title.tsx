import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function formatTitle(str: string | undefined): string | undefined {
    if (!str) {
        return str;
    }
    return str
        .split('-')
        .map((word) => {
            return word.slice(0, 1).toUpperCase() + word.slice(1);
        })
        .join(' ');
}

const useStyles = makeStyles(() => ({
    title: {
        flexGrow: 1,
    },
}));

export default function Title() {
    const classes = useStyles();
    return (
        <Typography align='left' variant='h6' noWrap className={classes.title}>
            {formatTitle('prytaneum')}
        </Typography>
    );
}
