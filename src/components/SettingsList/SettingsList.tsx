import React from 'react';
import { Grid } from '@material-ui/core';

interface Props {
    children: JSX.Element | JSX.Element[];
}

export default function SettingsList({ children }: Props) {
    return (
        <Grid container spacing={2}>
            {React.Children.map(children, (child) => (
                <Grid item xs={12}>
                    {child}
                </Grid>
            ))}
        </Grid>
    );
}
