/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// import TitleCard from '@local/components/TitleCard';
// import FadeThrough from '@local/animations/FadeThrough';
// import RequireRoles from '@local/domains/Logical/RequireRoles';
// import RoleInvite from '@local//Admin/RoleInvite';

import { formatDate } from '@local/utils/format';


const useStyles = makeStyles((theme) => ({
    item: {
        margin: theme.spacing(0, 0, 4, 0),
    },
    card: {
        padding: theme.spacing(1, 1, 1, 1),
    },
    title: {
        marginBottom: theme.spacing(1),
    },
    text: {
        marginLeft: theme.spacing(1),
    },
    secondaryText: {
        color: theme.palette.text.secondary,
    },
}));

interface DashboardEventProps {
    id: string,
    title: string,
    description: string,
    startDateTime: Date,
}

export function DashboardEvent(props: DashboardEventProps) {
    const classes = useStyles();

    return (
        <>
            <ListItemText
                primary={props.title}
                secondary={props.startDateTime && formatDate(props.startDateTime)}
            />
        </>
    );
}