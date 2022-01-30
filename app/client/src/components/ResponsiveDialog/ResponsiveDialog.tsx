/* eslint-disable prefer-arrow-callback */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MUIDialog, { DialogProps } from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide, { SlideProps } from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { DialogTitle } from '@material-ui/core';

const useStyles = makeStyles({
    appBar: {
        position: 'relative',
    },
    title: {
        flexGrow: 1,
    },
});

/** Transition used by FullScreenDialog -- it slides up
 *  @category Component
 *  @constructor Dialog
 */
const Transition = React.forwardRef(function Transition(props: SlideProps, ref: React.Ref<unknown>) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Slide direction='up' ref={ref} {...props} />;
});

export type ResponsiveDialogProps = {
    title?: string;
    toolbar?: React.ReactElement;
    currDialog?: string;
    onClose?: () => void;
} & DialogProps;

/**
 * Slide Up Dialog
 */
export function ResponsiveDialog(props: ResponsiveDialogProps) {
    const { children, title, fullScreen: _fullscreen, ...rest } = props;
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm')) || _fullscreen;

    return (
        <MUIDialog fullScreen={fullScreen} TransitionComponent={Transition} {...rest}>
            {fullScreen && (
                <AppBar elevation={0} className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge='start' color='inherit' onClick={rest.onClose} aria-label='close'>
                            <CloseIcon />
                        </IconButton>
                        <Typography component='span' variant='h6' className={classes.title}>
                            {title}
                        </Typography>
                    </Toolbar>
                </AppBar>
            )}
            {title && !fullScreen && <DialogTitle>{title}</DialogTitle>}
            {children}
        </MUIDialog>
    );
}

/**
 * Extremely simple helper hook for using the dialog
 */
export function useResponsiveDialog(initialState?: boolean) {
    // dialog state
    const [isOpen, setState] = React.useState(initialState || false);

    // helper functions
    const open = React.useCallback(() => setState(true), [setState]);
    const close = React.useCallback(() => setState(false), [setState]);
    const toggle = React.useCallback(() => setState((prev) => !prev), [setState]);

    // tuple state first, then helper functions -- order based on probable usage ie open/close will be used more than toggle
    return [isOpen, open, close, toggle] as const;
}

/**
 * Helper hook for using linked dialogs
 */
export function useLinkedResponsiveDialog() {
    // dialog state
    const [openDialog, setState] = React.useState('');

    // helper functions
    const open = React.useCallback((currDialog?: string) => setState(currDialog || ''), [setState]);
    const close = React.useCallback(() => setState(''), [setState]);

    // tuple state first, then helper functions -- order based on probable usage ie open/close will be used more than toggle
    return [openDialog, open, close] as const;
}

ResponsiveDialog.defaultProps = {
    title: undefined,
    onEntered: undefined,
    onExit: undefined,
};
