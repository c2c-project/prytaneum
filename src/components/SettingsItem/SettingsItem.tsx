/* eslint-disable react/require-default-props */
import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import Help from 'components/Help';

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
    return (
        <Grid
            container
            justify='flex-start'
            alignItems='center'
            className={className}
        >
            <Grid container item xs={6} alignItems='center' spacing={1}>
                <Grid item xs='auto'>
                    <Typography>{name}</Typography>
                </Grid>
                {helpText && (
                    <Grid item xs='auto'>
                        <Help>{helpText}</Help>
                    </Grid>
                )}
            </Grid>
            <Grid container justify='flex-end' item xs={6}>
                {children}
            </Grid>
        </Grid>
    );
}
