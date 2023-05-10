import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    item: {
        padding: theme.spacing(0, 0, 2, 0),
    },
}));

interface Props {
    children: React.ReactNode | React.ReactNodeArray;
    className?: string;
}

export function FormContent({ children, className }: Props) {
    const classes = useStyles();
    const count = React.Children.count(children);

    return (
        <Grid
            item
            width='100%'
            data-test-id='form-content'
            container
            className={className}
            alignItems='center'
            alignContent='center'
        >
            {React.Children.map(children, (child, idx) => (
                <Grid item width='100%' className={idx < count - 1 ? classes.item : ''}>
                    {child}
                </Grid>
            ))}
        </Grid>
    );
}

FormContent.defaultProps = {
    className: '',
};

FormContent.propTypes = {
    className: PropTypes.string,
};
