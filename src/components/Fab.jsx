import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Zoom from '@material-ui/core/Zoom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    }
}));

export default function MyFab({ onClick }) {
    const classes = useStyles();
    return (
        <Zoom in timeout={300}>
            <Fab onClick={onClick} className={classes.fab} color='secondary'>
                <AddIcon />
            </Fab>
        </Zoom>
    );
}

MyFab.propTypes = {
    onClick: PropTypes.func.isRequired
};
