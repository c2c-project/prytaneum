/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';

import { DeviceContext } from 'contexts/Device';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    btn: {
        width: '100%',
        height: '100%',
        minHeight: '160px',
        backgroundColor: theme.palette.background.paper,
    },
}));

const sizing: { desktop: 4; mobile: 12 } = {
    desktop: 4,
    mobile: 12,
};

export interface Props {
    children: JSX.Element | JSX.Element[];
    btnCols?:
        | boolean
        | 'auto'
        | 1
        | 2
        | 3
        | 4
        | 5
        | 6
        | 7
        | 8
        | 9
        | 10
        | 11
        | 12;
}

/** Test Description
 *  @category Component
 *  @constructor GridMenu
 */
export default function GridMenu({ children, btnCols }: Props) {
    const classes = useStyles();
    const value = React.useContext(DeviceContext);

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                {React.Children.map(children, (child, idx) => {
                    // clone the child and apply the button styles
                    const StylizedChild = React.cloneElement(child, {
                        className: clsx([
                            classes.btn,
                            (child.props as Record<string, unknown>).className,
                        ]),
                        size: 'large',
                        variant: 'contained',
                    });

                    return (
                        <Grid item key={idx} xs={btnCols || sizing[value] || 3}>
                            {StylizedChild}
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}

GridMenu.defaultProps = {
    btnCols: null,
};

GridMenu.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
    btnCols: PropTypes.number,
};
