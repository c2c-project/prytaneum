import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
    },
    loader: {
        position: 'absolute',
    },
    container: {
        position: 'relative',
        top: '35%',
    },
});

/**
 * @description generic Loader that displays in the center vertically and horizontally of its parent component
 */
const Loader = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <CircularProgress className={classes.loader} />
            </div>
        </div>
    );
};

export default Loader;
