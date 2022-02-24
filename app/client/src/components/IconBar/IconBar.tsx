import * as React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';

const useStyles = makeStyles(() => ({
    root: {
        height: '100%',
        margin: 0,
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
    },
    iconContainer: {
        padding: '1em',
    },
}));

interface Props {
    children: JSX.Element | JSX.Element[];
}

export default function IconBar({ children }: Props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container justifyContent='space-evenly'>
                {React.Children.map(children, (child, idx) => {
                    // clone the child and apply the button styles
                    const StylizedChild = React.cloneElement(child, {
                        size: 'large',
                        variant: 'contained',
                    });

                    return (
                        <Grid item key={idx} xs='auto'>
                            {StylizedChild}
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}

IconBar.defaultProps = {};

IconBar.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
};
