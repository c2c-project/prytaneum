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

interface Props {
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}


/** This function generates a Fab button 
 *  which is the '+' on the bottom of the page
 *  that runs the given function
 *  @category Component
 *  @constructor Fab
 *  @param props
 *  @param @todo
*/
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
