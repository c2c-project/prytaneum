import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

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
const Loader = () => {
    const classes = useStyles();
    return (
        <Grid container justify='center' className={classes.root}>
            <Grid
                item
                xs={12}
                container
                direction='column'
                alignContent='center'
            >
                <CircularProgress className={classes.loader} />
            </Grid>
        </Grid>
    );
};

export default Loader;
