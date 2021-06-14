import * as React from 'react';
import { Grid } from '@material-ui/core';

interface Props {
    children: JSX.Element | JSX.Element[];
    className?: string;
}

export default function SettingsList({ children, className }: Props) {
    return (
        <Grid container spacing={2} className={className}>
            {React.Children.map(children, (child) => (
                <Grid item xs={12}>
                    {child}
                </Grid>
            ))}
        </Grid>
    );
}
