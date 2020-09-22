/* eslint-disable react/prop-types */
import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    outerContainer: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    innerContainer: {
        position: 'absolute',
        width: '100%',
        height: '100vh',
        // overflowY: 'auto',
    },
    main: {
        marginBottom: '100px',
    },
    appBar: theme.mixins.toolbar,
}));

interface Props {
    children: JSX.Element | JSX.Element[] | React.ReactNode;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export default React.forwardRef<HTMLDivElement, Props>(function Page(
    props,
    ref
): JSX.Element {
    const { children, maxWidth } = props;
    const classes = useStyles();
    return (
        <Container
            maxWidth={maxWidth || 'md'}
            disableGutters
            className={classes.outerContainer}
            ref={ref}
        >
            <div className={classes.innerContainer}>
                <div className={classes.appBar} />
                <main className={classes.main}>{children}</main>
                <div className={classes.appBar} />
            </div>
        </Container>
    );
});
