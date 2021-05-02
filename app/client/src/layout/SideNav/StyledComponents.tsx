/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ListItem, ListItemIcon, ListSubheader, ListSubheaderProps, Divider } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

export const StyledListItem = withStyles((theme) => ({
    selected: {
        color: theme.palette.primary.contrastText,
        '&.MuiListItemIcon-root': {
            color: theme.palette.primary.contrastText,
        },
    },
    root: {
        borderRadius: theme.custom.borderRadius,
    },
}))(ListItem);

export const StyledListItemIcon = withStyles({
    root: {
        color: 'inherit',
    },
})(ListItemIcon);

export const StyledDivider = withStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(1),
    },
}))(Divider);

const useSubheaderStyles = makeStyles((theme) => ({
    root: {
        ...theme.typography.overline,
        fontSize: '1.25em',
    },
}));

export const StyledSubheader = (props: ListSubheaderProps<'div'>) => {
    const classes = useSubheaderStyles();
    return <ListSubheader disableSticky classes={classes} component='div' {...props} />;
};
