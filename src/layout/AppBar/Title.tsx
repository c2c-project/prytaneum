import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { handleNavigation } from 'utils/history';

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
        cursor: 'pointer',
    },
}));

// TODO: disable link if they're not logged in
export default function Title() {
    const classes = useStyles();
    return (
        <Typography
            align='left'
            variant='h6'
            noWrap
            className={classes.title}
            onClick={handleNavigation('/app/home')}
        >
            {formatTitle('prytaneum')}
        </Typography>
    );
}
