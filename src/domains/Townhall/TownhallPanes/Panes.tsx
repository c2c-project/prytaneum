import React from 'react';
import { Grid } from '@material-ui/core';

interface PaneContentProps {
    children: React.ReactElement | React.ReactElement[];
}

export function PaneContent({ children }: PaneContentProps) {
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

interface PaneNavigationProps {
    children: React.ReactElement | React.ReactElement[];
}

export function PaneNavigation({ children }: PaneNavigationProps) {
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

interface PaneProps {
    children: React.ReactElement | React.ReactElement[];
    className?: string;
}
export function Pane({ children, className }: PaneProps) {
    return (
        <Grid container className={className} direction='column'>
            {children}
        </Grid>
    );
}

Pane.defaultProps = {
    className: undefined,
};
