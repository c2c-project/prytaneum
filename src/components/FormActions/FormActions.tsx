import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

interface Props {
    children: JSX.Element | JSX.Element[];
}

const useStyles = makeStyles((theme) => ({
    item: {
        padding: theme.spacing(0, 2, 0, 0),
    },
    grow: {
        flexGrow: 1,
    },
}));

export default function FormActions({ children }: Props) {
    const classes = useStyles();
    const count = React.Children.count(children);
    const getClassName = (idx: number) => {
        if (idx < count - 1) return clsx([classes.item, classes.grow]);
        return classes.grow;
    };
    return (
        <Grid
            item
            xs={12}
            container
            justify='space-evenly'
            alignContent='flex-end'
            alignItems='center'
        >
            {React.Children.map(children, (child, idx) => (
                <Grid item xs='auto' className={getClassName(idx)}>
                    {child}
                </Grid>
            ))}
        </Grid>
    );
}
