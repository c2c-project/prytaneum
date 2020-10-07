/* eslint-disable react/require-default-props */
import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import Help from 'components/Help';

const useStyles = makeStyles({
    grow: {
        flexGrow: 1,
    },
});

interface Props {
    helpText?: string;
    className?: string;
    name: string;
    children: JSX.Element;
}

export default function SettingsItem({
    helpText,
    name,
    className,
    children,
}: Props) {
    const classes = useStyles();
    return (
        <Grid
            container
            justify='flex-start'
            alignItems='center'
            className={helpText ? className : clsx([className, classes.grow])}
            spacing={1}
        >
            <Typography>{name}</Typography>
            {helpText && (
                <Grid item xs='auto' className={classes.grow}>
                    <Help>{helpText}</Help>
                </Grid>
            )}
            {children}
        </Grid>
    );
}
