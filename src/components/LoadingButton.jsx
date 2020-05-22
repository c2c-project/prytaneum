import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function LoadingButton({ loading, component }) {
    if (loading) {
        return React.cloneElement(
            component,
            { disabled: loading },
            <CircularProgress />
        );
    }
    return component;
}

LoadingButton.propTypes = {
    loading: PropTypes.bool.isRequired,
};
