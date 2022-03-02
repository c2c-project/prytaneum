/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { Paper, IconButton, Popper, Grow, ClickAwayListener, Typography, PopperPlacementType } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import HelpIcon from '@mui/icons-material/Help';

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
        [theme.breakpoints.down('sm')]: {
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
                onClick={({ currentTarget }) => (anchor ? setAnchor(null) : setAnchor(currentTarget))}
                size='large'
            >
                <HelpIcon />
            </IconButton>
            <Popper placement={placement} open={Boolean(anchor)} anchorEl={anchor} transition>
                {({ TransitionProps }) => (
                    <ClickAwayListener onClickAway={() => setAnchor(null)}>
                        <Grow {...TransitionProps} timeout={350}>
                            <Paper className={classes.paper}>
                                {typeof children === 'string' ? (
                                    <Typography variant='body2'>{children}</Typography>
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
