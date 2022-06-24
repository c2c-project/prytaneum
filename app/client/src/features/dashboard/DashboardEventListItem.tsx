import * as React from 'react';
import { useRouter } from 'next/router';
import { Button, IconButton, Link, ListItem } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
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
    ongoing: boolean;
    divider: boolean;
}

export function DashboardEventListItem({ event, ongoing, divider }: DashboardEventListItemProps) {
    const router = useRouter();
    const handleNav = (path: string) => () => router.push(path);

    return (
        <ListItem key={event.id} divider={divider}>
            {event.title && event.description && event.startDateTime && event?.organization?.name && (
                <DashboardEvent
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    description={event.description}
                    startDateTime={event.startDateTime}
                    organization={event?.organization?.name}
                />
            )}

            {ongoing ? (
                <Link onClick={handleNav(`/events/${event.id}/live`)}>
                    <Button aria-label='view live feed of current event' variant='contained' color='primary'>
                        Live Feed
                    </Button>
                </Link>
            ) : (
                <IconButton
                    aria-label='view future event'
                    size='large'
                    onClick={handleNav(`/events/${event.id}/settings`)}
                >
                    <ChevronRight />
                </IconButton>
            )}
        </ListItem>
    );
}
