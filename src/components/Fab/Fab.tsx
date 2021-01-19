/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import MUIFab, { FabProps } from '@material-ui/core/Fab';
import Zoom, { ZoomProps as _ZoomProps } from '@material-ui/core/Zoom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

/** This function generates a Fab button
 *  which is the '+' on the bottom of the page
 *  that runs the given function
 *  @category Component
 *  @constructor Fab
 *  @param props
 *  @param @todo
 */
export default function Fab({ children, ZoomProps, ...rest }: FabProps & { ZoomProps?: _ZoomProps }) {
    const classes = useStyles();
    return (
        <Zoom in timeout={300} {...ZoomProps}>
            <MUIFab className={classes.fab} color='secondary' {...rest}>
                {children}
            </MUIFab>
        </Zoom>
    );
}

Fab.defaultProps = {
    ZoomProps: {},
};
