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

<<<<<<< HEAD:src/components/Fab/Fab.tsx
interface Props {
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}


/** This function generates a Fab button 
 *  which is the '+' on the bottom of the page
 *  that runs the given function
 *  @category Component
 *  @constructor Fab
 *  @param props
 *  @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} props.onClick 
 *          props consists of an onClick function
*/
export default function Fab({ onClick }: Props) {
=======
export default function Fab({ children, ...rest }: FabProps) {
>>>>>>> ae9e94d4142381e48183ff99649042d7be5b9f5d:src/components/Fab.tsx
    const classes = useStyles();
    return (
        <Zoom in timeout={300}>
            <MUIFab {...rest} className={classes.fab} color='secondary'>
                {children}
            </MUIFab>
        </Zoom>
    );
}
<<<<<<< HEAD:src/components/Fab/Fab.tsx

Fab.propTypes = {
    onClick: PropTypes.func.isRequired,
};
=======
>>>>>>> ae9e94d4142381e48183ff99649042d7be5b9f5d:src/components/Fab.tsx
