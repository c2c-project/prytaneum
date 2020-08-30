import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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
}));

interface Props {
    children: JSX.Element | JSX.Element[];
    justify: string;
}

function convertNum(children: number) {
    if (children <= 12) {
        return Math.round(12 / children) as
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
    return Math.ceil(12 / children) as 1;
}

export default function IconBar({ children, justify }: Props) {
    const classes = useStyles();
    const b = convertNum(React.Children.count(children));

    return (
        <div className={classes.root}>
            <div
                className={classes.container}
                style={{
                    justifyContent: justify,
                }}
            >
                <div className={classes.footer}>
                    <Grid container>
                        {React.Children.map(children, (child, idx) => {
                            // clone the child and apply the button styles
                            const StylizedChild = React.cloneElement(child, {
                                size: 'large',
                                variant: 'contained',
                            });

                            return (
                                <Grid item key={idx} xs={b}>
                                    {StylizedChild}
                                </Grid>
                            );
                        })}
                    </Grid>
                </div>
            </div>
        </div>
    );
}

IconBar.defaultProps = {};

IconBar.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
};
