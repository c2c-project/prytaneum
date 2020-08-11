/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import MUIFab, { FabProps } from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

export default function Fab({ children, ...rest }: FabProps) {
    const classes = useStyles();
    return (
        <Zoom in timeout={300}>
            <MUIFab {...rest} className={classes.fab} color='secondary'>
                {children}
            </MUIFab>
        </Zoom>
    );
}
