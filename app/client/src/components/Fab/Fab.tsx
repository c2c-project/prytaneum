/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import MUIFab, { FabProps } from '@mui/material/Fab';
import Zoom, { ZoomProps as _ZoomProps } from '@mui/material/Zoom';
import makeStyles from '@mui/styles/makeStyles';

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
export function Fab({ children, ZoomProps, ...rest }: FabProps & { ZoomProps?: Omit<_ZoomProps, 'children'> }) {
    const classes = useStyles();
    return (
        <Zoom in timeout={300} {...ZoomProps}>
            <MUIFab className={classes.fab} color='primary' {...rest}>
                {children}
            </MUIFab>
        </Zoom>
    );
}

Fab.defaultProps = {
    ZoomProps: {},
};
