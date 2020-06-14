import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

/**
 * @description Transition used by FullScreenDialog -- it slides up
 */
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Slide direction='up' ref={ref} {...props} />;
});

/**
 * @description full screen dialog box
 * @arg {Object} props
 * @arg {PropTypes.ReactNodeArray|PropTypes.ReactNodeLike} props.children what to display inside the dialog
 * @arg {Boolean} props.open parent is expected to handle open or closed state, so this is either T or F
 * @arg {Function} props.onClose function to run when the close button is clicked within the dialog, typically setting open to false
 */

interface Props {
    children: JSX.Element | JSX.Element[];
    open: boolean;
    onClose: () => void;
}
export default function FullScreenDialog({ children, open, onClose }: Props) {
    const classes = useStyles();

    return (
        <div>
            <Dialog
                fullScreen
                open={open}
                onClose={onClose}
                TransitionComponent={Transition}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            edge='start'
                            color='inherit'
                            onClick={onClose}
                            aria-label='close'
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                {open && children}
            </Dialog>
        </div>
    );
}

FullScreenDialog.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
