import React from 'react';
import PropTypes from 'prop-types';
import MUIFab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
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
 *  category Component
 *  @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} props 
 *          props consists of an onClick function
*/
export default function Fab({ onClick }: Props) {
    const classes = useStyles();
    return (
        <Zoom in timeout={300}>
            <MUIFab onClick={onClick} className={classes.fab} color='secondary'>
                <AddIcon />
            </MUIFab>
        </Zoom>
    );
}

Fab.propTypes = {
    onClick: PropTypes.func.isRequired,
};


/**
 * @category Component
 * @description Alerts(param)
 * @param {string} alertMsg
 */
export function Alert(s: string) {
    alert(s);
}