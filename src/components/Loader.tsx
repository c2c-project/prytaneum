import React from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100%',
    },
    loader: {
        position: 'absolute',
    },
});

/**
 * @description generic Loader that displays in the center vertically and horizontally of its parent component
 */
const Loader = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid
                container
                style={{ height: '100%' }}
                alignItems='center'
                justify='center'
            >
                <CircularProgress className={classes.loader} />
            </Grid>
        </div>
    );
};

export default Loader;
