/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
    Paper,
    IconButton,
    Popper,
    Grow,
    ClickAwayListener,
    Typography,
    PopperPlacementType,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HelpIcon from '@material-ui/icons/Help';

interface RequiredProps {
    children: JSX.Element | string;
}

interface OptionalProps {
    edge?: 'end' | 'start';
    placement?: PopperPlacementType;
}

const defaultProps: OptionalProps = {
    edge: undefined,
    placement: 'bottom',
};

type Props = OptionalProps & RequiredProps;

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            maxWidth: '35vw',
        },
        [theme.breakpoints.down('xs')]: {
            maxWidth: '90vw',
        },
    },
}));

export default function Help({ children, edge, placement }: Props) {
    const classes = useStyles();
    const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);

    return (
        <>
            <IconButton
                edge={edge}
                onClick={({ currentTarget }) =>
                    anchor ? setAnchor(null) : setAnchor(currentTarget)
                }
            >
                <HelpIcon />
            </IconButton>
            <Popper
                placement={placement}
                open={Boolean(anchor)}
                anchorEl={anchor}
                transition
            >
                {({ TransitionProps }) => (
                    <ClickAwayListener onClickAway={() => setAnchor(null)}>
                        <Grow {...TransitionProps} timeout={350}>
                            <Paper className={classes.paper}>
                                {typeof children === 'string' ? (
                                    <Typography variant='body2'>
                                        {children}
                                    </Typography>
                                ) : (
                                    children
                                )}
                            </Paper>
                        </Grow>
                    </ClickAwayListener>
                )}
            </Popper>
        </>
    );
}

Help.defaultProps = defaultProps;
