import React from 'react';
import { Grid } from '@material-ui/core';

interface Props {
    children: React.ReactElement | React.ReactElement[];
}

export default function PaneContent({ children }: Props) {
    return (
        <>
            {React.Children.map(children, (child) => (
                <Grid item xs='auto' style={{ flexGrow: 1 }}>
                    {child}
                </Grid>
            ))}
        </>
    );
}
