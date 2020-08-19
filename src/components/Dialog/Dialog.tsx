import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MUIDialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide, { SlideProps } from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    appBar: {
        position: 'relative',
    },
    title: {
        flexGrow: 1,
    },
});

/**
 *  Transition used by FullScreenDialog -- it slides up
 */
const Transition = React.forwardRef(function Transition(
    props: SlideProps,
    ref: React.Ref<unknown>
) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Slide direction='up' ref={ref} {...props} />;
});

export interface Props {
    children: JSX.Element | JSX.Element[];
    open: boolean;
    onClose: () => void;
    title?: string;
    onEntered?: () => void;
    onExit?: () => void;
}

/**
 * Slide Up Dialog
 */
export default function Dialog(props: Props) {
    const { children, open, onClose, title, onEntered, onExit } = props;
    const classes = useStyles();

    return (
        <div>
            <MUIDialog
                fullScreen
                open={open}
                onClose={onClose}
                onEntered={onEntered}
                onExit={onExit}
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
                        <Typography variant='h6' className={classes.title}>
                            {title}
                        </Typography>
                    </Toolbar>
                </AppBar>
                {open && children}
            </MUIDialog>
        </div>
    );
}

Dialog.defaultProps = {
    title: undefined,
    onEntered: undefined,
    onExit: undefined,
};
