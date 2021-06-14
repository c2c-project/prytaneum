import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

interface Props {
    loading: boolean;
    children: JSX.Element;
    className?: string;
    style?: React.CSSProperties;
}

/**
 * LoadingButton displays a clickable button with a loading circle if (bool) loading is set
 * @category Component
 * @constructor LoadingButton
 */
export function LoadingButton({ loading, children, className, style }: Props) {
    const theme = useTheme();
    if (loading) {
        try {
            return React.cloneElement(
                React.Children.only(children),
                {
                    disabled: loading,
                    'aria-label': 'Loading Button',
                    endIcon: undefined,
                    startIcon: undefined,
                },
                <CircularProgress className={className} style={style} size={theme.typography.button.lineHeight} />
            );
        } catch (e) {
            // eslint-disable-next-line no-console
            console.warn(e);
            return children;
        }
    }
    return children;
}

LoadingButton.defaultProps = {
    className: undefined,
    style: undefined,
};

LoadingButton.propTypes = {
    loading: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};
