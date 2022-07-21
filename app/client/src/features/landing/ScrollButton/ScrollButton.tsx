import * as React from 'react';
import { Grid, IconButton } from '@mui/material';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import makeStyles from '@mui/styles/makeStyles';
import useScrollTo from '@local/core/useScrollTo';

const useStyles = makeStyles((theme) => ({
    arrowsection: {
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    downarrow: {
        fontSize: '4rem',
        transform: 'rotate(-90deg)',
    },
}));

interface Props {
    sentinelRef: React.RefObject<HTMLElement>;
}

export function ScrollButton({ sentinelRef }: Props) {
    const classes = useStyles();
    // FIXME:
    const [scrollToAnchor /*, isAnchorInView*/] = useScrollTo(sentinelRef);

    return (
        <Grid item xs={12} className={classes.arrowsection}>
            <IconButton onClick={() => scrollToAnchor('smooth')} size='large'>
                <ArrowBackIosRoundedIcon className={classes.downarrow} />
            </IconButton>
        </Grid>
    );
}
