import React from 'react';
import PropTypes from 'prop-types';

import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
    children: React.ReactNodeArray | React.ReactNode;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    disableGutters?: boolean;
}

const useStyles = makeStyles(() => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
    },
    main: {
        flexGrow: 1,
    },
}));

const Page = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    const { children, maxWidth, disableGutters } = props;
    const classes = useStyles();
    return (
        <div id='page-root' className={classes.root}>
            <Container
                maxWidth={maxWidth || 'md'}
                disableGutters={disableGutters}
                className={classes.main}
                ref={ref}
            >
                {/* I know that this will always be a valid element so... */}
                {children as React.ReactElement}
            </Container>
        </div>
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
