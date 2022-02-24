/* eslint-disable prefer-arrow-callback */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import MUIDialog, { DialogProps } from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide, { SlideProps } from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DialogTitle } from '@mui/material';

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
    onClose?: () => void;
} & DialogProps;

/**
 * Slide Up Dialog
 */
export function ResponsiveDialog(props: ResponsiveDialogProps) {
    const { children, title, fullScreen: _fullscreen, ...rest } = props;
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md')) || _fullscreen;

    return (
        <MUIDialog fullScreen={fullScreen} TransitionComponent={Transition} {...rest}>
            {fullScreen && (
                <AppBar elevation={0} className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge='start' color='inherit' onClick={rest.onClose} aria-label='close' size='large'>
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

ResponsiveDialog.defaultProps = {
    title: undefined,
    onEntered: undefined,
    onExit: undefined,
};
