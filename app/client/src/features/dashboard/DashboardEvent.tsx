import * as React from 'react';
import { ListItemText } from '@mui/material';
import { formatDate } from '@local/utils/format';

interface DashboardEventProps {
    id: string;
    title: string | null;
    description: string | null;
    startDateTime: Date | null;
    organization: string | undefined;
}

export function DashboardEvent({ title, startDateTime, organization }: DashboardEventProps) {
    return (
        <div>
            <ListItemText primary={title} />
            <ListItemText secondary={startDateTime && formatDate(startDateTime)} />
            <ListItemText secondary={organization} />
        </div>
    );
}
