/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';
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
    organization: string,
}

export function DashboardEvent(props: DashboardEventProps) {

    return (
        <>
            <ListItemText
                primary={props.title}
                secondary={
                    <div>
                        <div>{props.startDateTime && formatDate(props.startDateTime)}</div>
                        <div>{props.organization}</div>
                    </div>
                }
            />
        </>
    );
}