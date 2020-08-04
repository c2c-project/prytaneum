/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import GridList from '@material-ui/core/GridList';
// import GridListTile from '@material-ui/core/GridListTile';
import clsx from 'clsx';

import { DeviceContext } from 'contexts/Device';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        margin: 0,
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        textAlign: 'center',
        padding: '1em',
    },
    // gridList: {
    //     width: '100%',
    //     height: '100%',
    // },
}));



interface Props {
    children: JSX.Element | JSX.Element[];
    alignBar: string;
}

export default function IconBar({ children, alignBar }: Props) {
    const classes = useStyles();
    const value = React.useContext(DeviceContext);

    return (
        <div className={classes.root}>
            <div
                className={classes.container}
                style={{
                    justifyContent: alignBar,
                }}
            >
                <div className={classes.footer}>
                    <Grid container spacing={2}>
                        {React.Children.map(children, (child, idx) => {
                            // clone the child and apply the button styles
                            const StylizedChild = React.cloneElement(child, {
                                className: clsx([
                                    classes.btn,
                                    (child.props as Record<string, unknown>)
                                        .className,
                                ]),
                                size: 'large',
                                variant: 'contained',
                            });

                            return (
                                <Grid
                                    item
                                    key={idx}
                                    xs={12 / React.Children.count(children)}
                                >
                                    {StylizedChild}
                                </Grid>
                            );
                        })}
                    </Grid>
                </div>
            </div>

            {/* <GridList cellHeight={160} className={classes.gridList} cols={12}>
                {React.Children.map(children, (child, idx) => {
                    // clone the child and apply the button styles
                    const StylizedChild = React.cloneElement(child, {
                        className: clsx([classes.btn, child.props.className]),
                        size: 'large',
                        variant: 'contained',
                        color: 'primary',
                        elevation: 5,
                    });

                    return (
                        <GridListTile
                            key={idx}
                            cols={btnCols || sizing[value] || 3}
                        >
                            {StylizedChild}
                        </GridListTile>
                    );
                })}
            </GridList> */}
        </div>
    );
}

IconBar.defaultProps = {
  
};

IconBar.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
    
};
