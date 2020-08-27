/* eslint-disable react/prop-types */
import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    outerContainer: {
        position: 'relative',
    },
    innerContainer: {
        position: 'absolute',
    },
});

interface Props {
    children: JSX.Element | JSX.Element[];
    maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export default React.forwardRef<HTMLDivElement, Props>(function Page(
    props,
    ref
) {
    const { children, maxWidth } = props;
    const classes = useStyles();
    return (
        <Container
            maxWidth={maxWidth}
            disableGutters
            className={classes.outerContainer}
            ref={ref}
        >
            <div className={classes.innerContainer}>{children}</div>
        </Container>
    );
});
