import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100%',
    },
    loader: {
        flex: 1,
        display: 'flex',
    },
});

/**
 * @description generic Loader that displays in the center vertically and horizontally of its parent component
 * requires that the parent component have a height
 * @category Component
 * @constructor Loader
 */
export const Loader = () => {
    const classes = useStyles();
    return (
        <Grid container justifyContent='center' className={classes.root}>
            <Grid item xs={12} container direction='column' alignContent='center'>
                <CircularProgress className={classes.loader} />
            </Grid>
        </Grid>
    );
};
