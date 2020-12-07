import React from 'react';
import { Grid } from '@material-ui/core';

interface Props {
    children: React.ReactElement | React.ReactElement[];
    className?: string;
}
export default function Pane({ children, className }: Props) {
    return (
        <Grid container className={className} direction='column'>
            {children}
        </Grid>
    );
}

Pane.defaultProps = {
    className: undefined,
};
