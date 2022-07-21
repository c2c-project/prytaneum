import * as React from 'react';
import { List, ListItem, ListItemText, Typography, Grid, Button, DialogContent } from '@mui/material';
import { useRouter } from 'next/router';
import { Add } from '@mui/icons-material';
import { graphql, useFragment } from 'react-relay';

import type { OrgEventListFragment$key } from '@local/__generated__/OrgEventListFragment.graphql';
import { ResponsiveDialog, useResponsiveDialog } from '@local/components/ResponsiveDialog';
import { formatDate } from '@local/utils/format';
import { CreateEvent } from '@local/features/events';

interface OrgEventListProps {
    fragementRef: OrgEventListFragment$key;
    className?: string;
}

const EVENT_FRAGEMENT = graphql`
    fragment OrgEventListFragment on Organization {
        id
        events(first: $count, after: $cursor) @connection(key: "OrgEventListFragment_events") {
            __id
            edges {
                cursor
                node {
                    id
                    title
                    topic
                    startDateTime
                }
            }
            pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
            }
        }
    }
`;

export function OrgEventList({ fragementRef, className }: OrgEventListProps) {
    const data = useFragment(EVENT_FRAGEMENT, fragementRef);
    const eventArr = React.useMemo(() => data.events?.edges || [], [data]);
    const router = useRouter();
    const handleNav = (path: string) => () => router.push(path);
    const [isOpen, open, close] = useResponsiveDialog(false);

    return (
        <Grid container item direction='column' className={className}>
            <Grid item xs={12}>
                {eventArr.length > 0 ? (
                    <List>
                        {eventArr.map(({ node }, idx) => (
                            <ListItem
                                button
                                key={node.id}
                                divider={idx !== eventArr.length - 1}
                                onClick={handleNav(`/events/${node.id}/settings`)}
                            >
                                <ListItemText
                                    primary={node.title}
                                    secondary={node.startDateTime && formatDate(node.startDateTime)}
                                />
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography align='center' variant='body2' color='textSecondary'>
                        No events to display
                    </Typography>
                )}
            </Grid>
            <Grid container justifyContent='flex-end'>
                <ResponsiveDialog open={isOpen} onClose={close}>
                    <DialogContent>
                        <CreateEvent
                            connections={data.events ? [data.events.__id] : []}
                            orgId={data.id}
                            onCancel={close}
                            onSubmit={close}
                        />
                    </DialogContent>
                </ResponsiveDialog>
                <Button onClick={open} startIcon={<Add />}>
                    New Event
                </Button>
            </Grid>
        </Grid>
    );
}
