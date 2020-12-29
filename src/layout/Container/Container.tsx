import React from 'react';
import PropTypes from 'prop-types';

import { Container as MUIContainer, ContainerProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

type Props = {
    disableGutters?: boolean;
    children: React.ReactNodeArray | React.ReactNode;
} & Pick<ContainerProps, 'maxWidth'>;

const useStyles = makeStyles(() => ({
    root: {
        height: '100%',
        width: '100%',
        flex: '1 1 100%',
    },
}));

const Container = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    const { children, maxWidth, disableGutters } = props;
    const classes = useStyles();
    return (
        <MUIContainer
            id='container-wrapper'
            maxWidth={maxWidth || 'md'}
            disableGutters={disableGutters}
            ref={ref}
            className={classes.root}
        >
            {children as React.ReactChild}
        </MUIContainer>
    );
});

Container.defaultProps = {
    disableGutters: true,
    maxWidth: 'md',
};

Container.propTypes = {
    disableGutters: PropTypes.bool,
    maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
};

export default Container;
