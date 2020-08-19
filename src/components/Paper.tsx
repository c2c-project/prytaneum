/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import MuiPaper, { PaperProps } from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    paper: {
        borderRadius: theme.custom.borderRadius,
    },
}));

/** Paper returns a MaterialUI paper with children as its contents
 * @category Component
 * @constructor Loader
 * @param {props} PaperProps holds children, className, classNameProp
 */
export default function Paper(props: PaperProps) {
    const classes = useStyles();
    const { children, className: classNameProp } = props;
    const className = classNameProp
        ? clsx([classNameProp, classes.paper])
        : classes.paper;
    return (
        <MuiPaper elevation={3} {...props} className={className}>
            {children}
        </MuiPaper>
    );
}
