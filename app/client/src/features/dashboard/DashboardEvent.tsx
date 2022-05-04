/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { ListItemText } from '@mui/material';
import { formatDate } from '@local/utils/format';

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