import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

interface Props {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode | React.ReactNodeArray;
    className?: string;
}

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            paddingBottom: theme.spacing(2),
        },
        '&:last-child': {
            paddingBottom: 0,
        },
    },
}));

export function Form({ onSubmit, children, className: parentClass }: Props) {
    const classes = useStyles();
    const className = clsx(parentClass, classes.root);
    return (
        <Grid noValidate component='form' autoComplete='off' onSubmit={onSubmit} container className={className}>
            {children}
        </Grid>
    );
}

Form.defaultProps = {
    className: '',
};

Form.propTypes = {
    className: PropTypes.string,
};
