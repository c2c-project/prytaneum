import * as React from 'react';
import { useRouter } from 'next/router';
import { ListItem, ListItemAvatar } from '@mui/material';
import { Shield } from '@mui/icons-material';
import { DashboardEvent } from '@local/features/dashboard/DashboardEvent';

interface DashboardEventListItemProps {
    event: {
        id: string;
        title: string | null;
        description: string | null;
        startDateTime: Date | null;
        endDateTime: Date | null;
        isViewerModerator: boolean | null;
        organization: {
            name: string;
        } | null;
    };
    divider: boolean;
    children: React.ReactNode;
}

function ModeratorIcon({ isModerator }: { isModerator: boolean }) {
    if (isModerator)
        return (
            <ListItemAvatar>
                <Shield />
            </ListItemAvatar>
        );
    return <></>;
}

export function DashboardEventListItem({ event, divider, children }: DashboardEventListItemProps) {
    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        if (event.isViewerModerator) router.push(`/events/${event.id}/settings`);
    };

    return (
        <ListItem
            key={event.id}
            divider={divider}
            button
            onClick={handleClick}
            disableRipple={!event.isViewerModerator}
            disableTouchRipple={!event.isViewerModerator}
        >
            <ModeratorIcon isModerator={!!event.isViewerModerator} />
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
