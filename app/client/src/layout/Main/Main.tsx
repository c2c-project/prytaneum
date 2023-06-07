/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import PropTypes from 'prop-types';

import { Container as MUIContainer, ContainerProps, Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';

type Props = {
    children?: React.ReactNodeArray | React.ReactNode;
    spacing?: number;
} & Omit<ContainerProps, 'children'>;

const useStyles = makeStyles<Theme, Props>((theme) => ({
    root: {
        height: '100%',
        width: '100%',
        flex: '1 1 100%',
        display: 'flex',
    },
    main: {
        flex: '1 1 100%',
        position: 'relative',
    },
    spacing: ({ spacing }) => ({
        padding: spacing ? theme.spacing(spacing) : 0,
    }),
    maxWidth: {
        [theme.breakpoints.up('lg')]: {
            maxWidth: '90%',
        },
    },
}));

const Container = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    const { children, className, ...passThroughProps } = props;
    const classes = useStyles(props);
    return (
        <MUIContainer
            disableGutters
            maxWidth={false}
            ref={ref}
            className={clsx([classes.root, classes.spacing, className, classes.maxWidth])}
            {...passThroughProps}
        >
            <main className={classes.main}>{children}</main>
        </MUIContainer>
    );
});

Container.defaultProps = {
    children: undefined,
    className: undefined,
};

Container.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    className: PropTypes.string,
};

export default Container;
