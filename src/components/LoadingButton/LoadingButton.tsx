import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

interface Props {
    loading: boolean;
    component: JSX.Element;
}

/**
 * LoadingButton displays a clickable button with a loading circle if (bool) loading is set
 * @category Component
 * @constructor LoadingButton
 */
export default function LoadingButton({ loading, component }: Props) {
    const theme = useTheme();
    if (loading) {
        return React.cloneElement(
            component,
            { disabled: loading, 'aria-label': 'Loading Button' },
            <CircularProgress size={theme.typography.button.lineHeight} />
        );
    }
    return component;
}

LoadingButton.propTypes = {
    loading: PropTypes.bool.isRequired,
    component: PropTypes.node.isRequired,
};
