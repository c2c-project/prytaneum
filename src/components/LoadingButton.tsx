import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

interface Props {
    loading: boolean;
    component: JSX.Element;
}

export default function LoadingButton({ loading, component }: Props) {
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
    component: PropTypes.node.isRequired,
};
