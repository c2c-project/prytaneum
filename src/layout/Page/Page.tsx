import React from 'react';
import PropTypes from 'prop-types';

import { Container } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

interface Props {
    children: JSX.Element | JSX.Element[] | React.ReactNode;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    disableGutters?: boolean;
}

const useStyles = makeStyles<Theme, Props>((theme) => ({
    outerContainer: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    // innerContainer: {
    //     // FIXME: if I want to make it so taht slide in works properly I'll need to mess with this
    //     // position: 'absolute',
    //     width: '100%',
    //     height: '100%',
    //     // overflowY: 'auto', // TODO: fix
    // },
    main: {
        height: `calc(100vh - ${theme.mixins.toolbar.minHeight || 56}px)`,
        [theme.breakpoints.up('sm')]: {
            height: `calc(100vh - ( ${
                theme.mixins.toolbar.minHeight || 64
            }px))`,
        },
        [theme.breakpoints.down('xs')]: {
            height: `calc(100vh - ${theme.mixins.toolbar.minHeight || 48}px)`,
        },
    },
    appBar: theme.mixins.toolbar,
}));

const Page = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    const { children, maxWidth, disableGutters } = props;
    const classes = useStyles(props);
    return (
        <>
            <div className={classes.appBar} />
            <main className={classes.main}>
                <Container
                    maxWidth={maxWidth || 'md'}
                    disableGutters={disableGutters}
                    className={classes.outerContainer}
                    ref={ref}
                >
                    {/* <div className={classes.innerContainer}> */}
                    {children}
                    {/* </div> */}
                </Container>
            </main>
        </>
    );
});

Page.defaultProps = {
    disableGutters: true,
    maxWidth: 'md',
};

Page.propTypes = {
    disableGutters: PropTypes.bool,
    maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
};

export default Page;
