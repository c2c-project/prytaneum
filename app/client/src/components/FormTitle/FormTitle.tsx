/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, TypographyProps } from '@mui/material';

interface Props {
    title: string;
    subtitle?: string;
    description?: React.ReactNode | string;
    titleTypographyProps?: TypographyProps;
}

export function FormTitle({ title, subtitle, description, titleTypographyProps }: Props) {
    return (
        <Grid container width='100%'>
            <Grid item width='100%'>
                <Typography variant='h4' {...titleTypographyProps}>
                    {title}
                </Typography>
            </Grid>
            {subtitle && (
                <Grid item xs={12}>
                    <Typography variant='caption' color='textSecondary'>
                        {subtitle}
                    </Typography>
                </Grid>
            )}
            {description && (
                <Grid item xs={12}>
                    {typeof description === 'string' ? <Typography paragraph>{description}</Typography> : description}
                </Grid>
            )}
        </Grid>
    );
}

FormTitle.defaultProps = {
    subtitle: '',
    description: '',
    titleTypographyProps: {},
};

FormTitle.propTypes = {
    subtitle: PropTypes.string,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    titleTypographyProps: PropTypes.object,
};
