import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
const useStyles = makeStyles((theme) => ({
    root: {
        color: 'blue',
    },
    circle: {
        clipPath: 'circle(40%)',

        height: '24px',

        width: '24px',
    },

    active: {
        backgroundColor: theme.palette.primary.main,
    },

    inactive: {
        backgroundColor: 'grey',
    },

    current: {
        height: '48px',

        width: '48px',
    },
}));

const containerStyles = {
    height: 10,
    width: '100%',
    backgroundColor: '#e0e0de',
    borderRadius: 50,
    margin: 50,
};

const fillerStyles = {
    height: '100%',
    width: '60%',
    backgroundColor: 'blue',
    borderRadius: 'inherit',
    textAlign: 'right',
};

const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
};

interface ProgressStepProps {
    active?: boolean;
    current?: boolean;
}

export function ProgressStep({ active, current }: ProgressStepProps) {
    const classes = useStyles();

    return (
        <div
            className={
                active
                    ? clsx([classes.circle, classes.active])
                    : clsx([classes.circle, classes.inactive])
            }
        />
    );
}

ProgressStep.defaultProps = {
    active: false,

    current: false,
};

interface Props {
    children: JSX.Element | JSX.Element[];

    currentStep: number;
}

export default function ProgressBar({ children, currentStep }: Props) {
    const sample = {
        backGroundColor: 'yellow',
    };
    return (
        <div>
            <Grid container>
                <div style={containerStyles}>
                    <div style={fillerStyles}>
                        <span></span>
                    </div>
                </div>
                <Grid item xs={12} container justify='space-evenly'>
                    {React.Children.map(children, (child, idx) => {
                        return (
                            <Grid item xs='auto' className='container1'>
                                {React.cloneElement(child, {
                                    active: idx < currentStep,
                                    current: idx + 1 === currentStep,
                                })}
                            </Grid>
                        );
                    })}
                </Grid>

                <Grid item xs={12} container justify='center'>
                    Current label
                </Grid>
            </Grid>
        </div>
    );
}
