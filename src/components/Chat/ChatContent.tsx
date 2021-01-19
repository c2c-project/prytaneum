import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import ArrowDownIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

import Fab from 'components/Fab';
import useScrollTo from 'hooks/useScrollTo';

export interface Props {
    children: React.ReactNode | React.ReactNodeArray;
}

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 475,
        flex: '1 1 100%',
        display: 'flex',
        position: 'relative',
    },
    list: {
        padding: theme.spacing(1),
        flex: '1 1 100%',
        listStyle: 'none',
    },
    sentinel: {
        height: 10,
        width: 10,
        visibility: 'hidden',
        bottom: 0,
    },
    scrollContainer: {
        display: 'flex',
        flex: '1 1 100%',
        overflowY: 'auto', // for scrolling
        overflowX: 'hidden', // otherwise a horizontal scrollbar will appear during load anim
        maxHeight: '100%', // for scrolling
    },
    fab: {
        position: 'absolute',
        right: theme.spacing(2),
        bottom: theme.spacing(2),
    },
}));

export default function ChatContent({ children }: Props) {
    const classes = useStyles();
    const hasRun = React.useRef(false);
    const sentinelRef = React.useRef<HTMLLIElement | null>(null);
    const [scrollToAnchor, isAnchorInView] = useScrollTo(sentinelRef);

    // TODO: use to calculate how many new messages there are
    // and update the pane context so it can display in the menu
    // const [, dispatch] = React.useContext(PaneContext);
    // const ref = React.useRef(0);

    React.useLayoutEffect(() => {
        if (!hasRun.current) scrollToAnchor('smooth');
        hasRun.current = true;
    }, [scrollToAnchor, isAnchorInView]);

    React.useEffect(() => {
        if (isAnchorInView) scrollToAnchor('auto');
    }, [children, isAnchorInView, scrollToAnchor]);

    if (React.Children.count(children) === 0)
        return (
            <Grid container item xs={12} justify='center' direction='column' className={classes.root}>
                <Typography variant='h5' paragraph align='center'>
                    Nothing to display here :(
                </Typography>
                <Typography variant='body1' align='center'>
                    Start sending mesages by using the textbox below
                </Typography>
            </Grid>
        );
    return (
        <Grid item container xs={12} className={classes.root}>
            <div className={classes.scrollContainer}>
                <ul className={classes.list}>
                    {children}
                    <li key='sentinel' ref={sentinelRef} className={classes.sentinel} />
                </ul>
            </div>
            <Fab ZoomProps={{ in: !isAnchorInView }} className={classes.fab} onClick={() => scrollToAnchor('auto')}>
                <ArrowDownIcon />
            </Fab>
        </Grid>
    );
}

ChatContent.defaultProps = {
    ChatMessageProps: {},
};
