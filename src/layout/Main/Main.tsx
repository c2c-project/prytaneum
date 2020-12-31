/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { Container as MUIContainer, ContainerProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

type Props = {
    children?: React.ReactNodeArray | React.ReactNode;
} & Omit<ContainerProps, 'children'>;

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
        flex: '1 1 100%',
        padding: theme.spacing(3, 0),
    },
    main: {
        height: '100%',
        width: '100%',
    },
}));

const Container = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    const { children, ...passThroughProps } = props;
    const classes = useStyles();
    return (
        <MUIContainer
            disableGutters
            maxWidth='md'
            ref={ref}
            className={classes.root}
            {...passThroughProps}
        >
            <main className={classes.main}>{children}</main>
        </MUIContainer>
    );
});

Container.defaultProps = {
    children: undefined,
};

Container.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
};

export default Container;
