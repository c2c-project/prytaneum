import React from 'react';
import { Grid } from '@material-ui/core';

interface Props {
    children: React.ReactElement | React.ReactElement[];
}

export default function PaneNavigation({ children }: Props) {
    return (
        <>
            {React.Children.map(children, (child) => (
                <Grid item xs='auto'>
                    {child}
                </Grid>
            ))}
        </>
    );
}
