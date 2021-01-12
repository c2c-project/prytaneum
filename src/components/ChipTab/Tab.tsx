/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Tab as MUITab, TabProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.pxToRem(13),
        height: 32, // material io spec for chips
        marginRight: theme.spacing(1),
        backgroundColor: theme.palette.grey[300],

        borderRadius: theme.shape.borderRadius,
        border: '1px solid grey',
        minWidth: 'unset',
        minHeight: 'unset',
        '&.Mui-selected': {
            transition: 'background-color 300ms ease-in-out',
        },
    },
    selected: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
}));

function Tab(props: TabProps) {
    const classes = useStyles();
    return <MUITab {...props} classes={classes} />;
}

export default Tab;
