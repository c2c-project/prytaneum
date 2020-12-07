import React from 'react';
import { IconButton, Tooltip, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CopyIcon from '@material-ui/icons/ContentCopy';

import useCopy from 'hooks/useCopy';

const useStyles = makeStyles((theme) => ({
    text: {
        paddingRight: theme.spacing(2),
    },
}));

interface Props {
    text: string;
}

export default function Copy({ text }: Props) {
    const [copy] = useCopy();
    const classes = useStyles();

    return (
        <Grid container alignItems='center'>
            <Grid item xs='auto' className={classes.text}>
                {text}
            </Grid>
            <Grid item xs='auto'>
                <Tooltip title='Copy' aria-label='copy'>
                    <IconButton onClick={() => copy(text)} edge='end'>
                        <CopyIcon />
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
    );
}
