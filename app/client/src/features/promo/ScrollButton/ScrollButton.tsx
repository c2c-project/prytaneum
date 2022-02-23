import * as React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTo from '@local/features/core/useScrollTo'

const useStyles = makeStyles((theme) => ({
    arrowsection: {
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    downarrow: {
        fontSize: '4rem',
        transform: 'rotate(-90deg)'
    },
}));

interface Props {
    sentinelRef: React.RefObject<HTMLElement>;
}

export function ScrollButton({sentinelRef}: Props) {
    const classes = useStyles();
    // FIXME:
    const [scrollToAnchor/*, isAnchorInView*/] = useScrollTo(sentinelRef);

    return (
        <Grid item xs={12} className={classes.arrowsection}>
            <IconButton onClick={() => scrollToAnchor('smooth')}>
                <ArrowBackIosRoundedIcon  className={classes.downarrow}/>
            </IconButton>
        </Grid>
    )
}
