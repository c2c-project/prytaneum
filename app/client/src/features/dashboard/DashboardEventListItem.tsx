import * as React from 'react';
import { useRouter } from 'next/router';
import { ListItem } from '@mui/material';
import { DashboardEvent } from '@local/features/dashboard/DashboardEvent';

interface DashboardEventListItemProps {
    event: {
        id: string;
        title: string | null;
        description: string | null;
        startDateTime: Date | null;
        endDateTime: Date | null;
        organization: {
            name: string;
        } | null;
    };
    divider: boolean;
    children: React.ReactNode;
}

export function DashboardEventListItem({ event, divider, children }: DashboardEventListItemProps) {
    const router = useRouter();
    const handleNav = (path: string) => () => router.push(path);

    return (
        <ListItem key={event.id} divider={divider} button onClick={handleNav(`/events/${event.id}/settings`)}>
            <DashboardEvent
                key={event.id}
                id={event.id}
                title={event.title}
                description={event.description}
                startDateTime={event.startDateTime}
                organization={event.organization?.name}
            />
            {children}
        </ListItem>
    );
}
