import type { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { Button, Card, CardContent, Grid, List, ListItemSecondaryAction, Typography } from '@mui/material';

import { DashboardEventListItem } from './DashboardEventListItem';
import { Event } from './Dashboard';

interface LiveFeedButtonProps {
    ongoing: boolean;
    onClick: () => void;
}

function LiveFeedButton({ ongoing, onClick }: LiveFeedButtonProps) {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        onClick();
    };

    if (ongoing)
        return (
            <ListItemSecondaryAction>
                <Button
                    aria-label='view live feed of current event'
                    variant='contained'
                    color='primary'
                    onClick={handleClick}
                >
                    Live Feed
                </Button>
            </ListItemSecondaryAction>
        );
    return <></>;
}

interface DashboardEventListProps {
    eventList: Event[];
    sectionTitle: ReactNode;
    ongoing: boolean;
}

export function DashboardEventList({ eventList, sectionTitle, ongoing }: DashboardEventListProps) {
    const router = useRouter();

    return (
        <Grid item xs={12} style={{ marginBottom: '2rem' }}>
            <Card style={{ padding: '.5rem' }}>
                <CardContent>
                    {sectionTitle}
                    {eventList.length > 0 ? (
                        <List>
                            {eventList.map(({ node: event }, idx) => {
                                return (
                                    <DashboardEventListItem
                                        key={event.id}
                                        event={event}
                                        divider={idx !== eventList.length - 1}
                                    >
                                        <LiveFeedButton
                                            ongoing={ongoing}
                                            onClick={() => router.push(`/events/${event.id}/live`)}
                                        />
                                    </DashboardEventListItem>
                                );
                            })}
                        </List>
                    ) : (
                        <Typography style={{ marginLeft: '.5rem' }} variant='subtitle2'>
                            No Events To Display
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Grid>
    );
}
