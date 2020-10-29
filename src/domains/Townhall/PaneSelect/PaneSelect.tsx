/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { MenuItem, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

import TextField, { Props as TextFieldProps } from 'components/TextField';
import { PaneContext } from '../Contexts/Pane';

// source for constants and other seemingly random stuff https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Badge/Badge.js
const RADIUS_STANDARD = 10;

interface Props {
    options: string[];
}

const useStyles = makeStyles((theme) => ({
    badge: {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: RADIUS_STANDARD,
        color: theme.palette.getContrastText(theme.palette.secondary.main),
        padding: theme.spacing(0, 1),
        minWidth: RADIUS_STANDARD * 2,
        fontSize: theme.typography.fontSize,
        fontWeight: theme.typography.fontWeightBold,
        marginRight: theme.spacing(2),
    },
    icon: {
        alignSelf: 'center',
        marginRight: theme.spacing(2),
        transform: 'rotate(0deg)',
        fontSize: '2.25em',
        top: 'calc(50% - 18px)', // magic number just from looking at mui source and visually testing
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    iconOpen: {
        transform: 'rotate(180deg)',
    },
    paper: {
        marginTop: theme.spacing(1),
    },
    select: {
        display: 'flex',
        background: theme.palette.background.paper,
        fontWeight: theme.typography.fontWeightBold,
        borderStyle: 'none',
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(2),
        boxShadow: theme.shadows[10],
        '&:focus': {
            borderRadius: theme.shape.borderRadius,
            background: theme.palette.background.paper,
            borderColor: theme.palette.secondary.light,
        },
    },
    list: {
        paddingTop: 0,
        paddingBottom: 0,
        background: theme.palette.background.paper,
        '& li': {
            fontWeight: theme.typography.fontWeightBold,
            padding: theme.spacing(2),
        },
        '& li:hover': {
            color: theme.palette.primary.contrastText,
            background: theme.palette.primary.light,
        },
        '& li.Mui-selected': {
            color: theme.palette.primary.contrastText,
            background: theme.palette.primary.main,
        },
        '& li.Mui-selected:hover': {
            background: theme.palette.primary.dark,
        },
    },
    input: {
        paddingLeft: theme.spacing(2),
    },
}));

export default function PaneSelect({
    options,
    value,
    ...rest
}: Props & TextFieldProps) {
    const classes = useStyles();
    const [state] = React.useContext(PaneContext);

    function getSecondary(option: string) {
        if (!state[option]) return null;
        if (value === option) return null;
        return (
            <div>
                <span className={classes.badge}>{state[option]}</span>
            </div>
        );
    }
    return (
        <TextField
            select
            variant='standard'
            value={value}
            {...rest}
            SelectProps={{
                disableUnderline: true,
                MenuProps: {
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                    },
                    transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left',
                    },
                    getContentAnchorEl: null,
                    PaperProps: {
                        className: classes.paper,
                    },
                    classes: {
                        list: classes.list,
                    },
                    marginThreshold: 0,
                },
                classes: {
                    iconOpen: classes.iconOpen,
                    icon: classes.icon,
                    root: classes.select,
                },
                IconComponent: ArrowDropDown,
            }}
            InputLabelProps={{
                classes: {
                    root: classes.input,
                },
            }}
        >
            {options.map((option) => (
                <MenuItem key={option} value={option}>
                    <Grid container>
                        <div style={{ flex: 1 }}>{option}</div>
                        {getSecondary(option)}
                    </Grid>
                </MenuItem>
            ))}
        </TextField>
    );
}
