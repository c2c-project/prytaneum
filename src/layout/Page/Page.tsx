/* eslint-disable react/prop-types */
import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        // position: 'relative',
        // overflowY: 'auto',
        // height: '100%',
        // width: '100%',
    },
    outerContainer: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    innerContainer: {
        // FIXME: if I want to make it so taht slide in works properly I'll need to mess with this
        // position: 'absolute',
        width: '100%',
        height: '100vh',
    },
    main: {
        marginBottom: '100px',
        width: '100%',
        height: '100%',
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
        <div>
            <div className={classes.appBar} />
            <main className={classes.main}>
                <Container
                    maxWidth={maxWidth || 'md'}
                    disableGutters
                    className={classes.outerContainer}
                    ref={ref}
                >
                    <div className={classes.innerContainer}>
                        {children}
                        <div className={classes.appBar} />
                    </div>
                </Container>
            </main>
        </div>
    );
});
