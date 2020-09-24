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
        transform: 'translateX(-5%)', // wasn't quite centered without this offset
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
 * requires that the parent component have a height
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
