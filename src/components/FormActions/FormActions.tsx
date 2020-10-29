import React from 'react';
import PropTypes from 'prop-types';
import { Grid, GridProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

interface Props {
    children: React.ReactNode | React.ReactNodeArray;
    gridProps?: GridProps;
    disableGrow?: boolean;
}

const useStyles = makeStyles((theme) => ({
    item: {
        padding: theme.spacing(0, 2, 0, 0),
    },
    grow: {
        flexGrow: 1,
    },
}));

export default function FormActions({
    children,
    gridProps,
    disableGrow,
}: Props) {
    const classes = useStyles();
    const count = React.Children.count(children);
    const getClassName = (idx: number) => {
        // if disableGrow, then don't apply grow to all items
        if (disableGrow) {
            if (idx < count - 1) return classes.item;
            return '';
        }
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
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...gridProps}
        >
            {React.Children.map(children, (child, idx) => (
                <Grid item xs='auto' className={getClassName(idx)}>
                    {child}
                </Grid>
            ))}
        </Grid>
    );
}

FormActions.defaultProps = {
    gridProps: {},
    disableGrow: false,
};

FormActions.propTypes = {
    gridProps: PropTypes.object,
    disableGrow: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
};
