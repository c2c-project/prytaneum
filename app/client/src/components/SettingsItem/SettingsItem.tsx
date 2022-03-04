/* eslint-disable react/require-default-props */
import * as React from 'react';
import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';

const useStyles = makeStyles({
    grow: {
        flex: 1,
    },
});

interface Props {
    helpText?: string;
    className?: string;
    name: string;
    children: JSX.Element;
}

export default function SettingsItem({ helpText, name, className, children }: Props) {
    const classes = useStyles();
    return (
        <Grid
            item
            xs={12}
            container
            justifyContent='flex-start'
            alignItems='center'
            className={helpText ? className : clsx([className, classes.grow])}
        >
            <Grid item className={classes.grow}>
                <Typography>{name}</Typography>
                {helpText && (
                    <Typography variant='caption' color='textSecondary'>
                        {helpText}
                    </Typography>
                )}
            </Grid>
            {children}
        </Grid>
    );
}
