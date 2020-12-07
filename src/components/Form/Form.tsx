import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

interface Props {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode | React.ReactNodeArray;
    className?: string;
}

export default function Form({ onSubmit, children, className }: Props) {
    return (
        <Grid
            noValidate
            component='form'
            autoComplete='off'
            onSubmit={onSubmit}
            spacing={2}
            container
            className={className}
        >
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
