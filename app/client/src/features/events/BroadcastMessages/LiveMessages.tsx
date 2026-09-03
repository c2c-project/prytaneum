/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { Card, Grid, List, ListItem, Paper, Typography } from '@mui/material';

import { useEvent } from '@local/features/events';
import { ConditionalRender } from '@local/components/ConditionalRender';
import { Loader } from '@local/components/Loader';
import { FragmentRefs, graphql } from 'relay-runtime';
import { PreloadedQuery, usePreloadedQuery, useQueryLoader } from 'react-relay';
import { BroadcastMessageAuthor } from './BroadcastMessageAuthor';
import { BroadcastMessageContent } from './BroadcastMessageContent';
import { LiveMessagesQuery } from '@local/__generated__/LiveMessagesQuery.graphql';
import { useUser } from '@local/features/accounts';

export const LIVE_MESSAGES_QUERY = graphql`
    query LiveMessagesQuery($eventId: ID!, $lang: String!) {
        eventBroadcastMessages(eventId: $eventId) {
            id
            broadcastMessage
            isVisible
            createdBy {
                firstName
            }
            ...BroadcastMessageAuthorFragment
            ...BroadcastMessageContentFragment @arguments(lang: $lang)
        }
    }
`;

type EventBroadcastMessage = {
    readonly id: string;
    readonly broadcastMessage: string;
    readonly isVisible: boolean | null;
    readonly createdBy: {
        readonly firstName: string | null;
    } | null;
    readonly ' $fragmentSpreads': FragmentRefs<'BroadcastMessageAuthorFragment' | 'BroadcastMessageContentFragment'>;
};

interface MessageListProps {
    broadcastMessages: readonly EventBroadcastMessage[];
}

function MessageList({ broadcastMessages: immutableBroadcastMessages }: MessageListProps) {
    // Hacky way to have deletes appear instant for the user even though the list itself doesn't update until the next polling interval
    const [deletedMessageIndex, setDeletedMessageIndex] = React.useState<number | null>(null);
    // Mutable
    const broadcastMessages = React.useMemo(() => {
        setDeletedMessageIndex(null);
        const mutableList = [...immutableBroadcastMessages];
        return mutableList.reverse();
    }, [immutableBroadcastMessages]);

    const isMessageDeleted = React.useCallback(
        (index: number) => {
            return deletedMessageIndex !== null && index === deletedMessageIndex;
        },
        [deletedMessageIndex]
    );

    return (
        <Paper>
            <Grid item container height='300px' sx={{ overflowY: 'scroll' }}>
                <Grid alignContent='center' justifyContent='center' container>
                    <Grid item width='90%'>
                        <List disablePadding>
                            {broadcastMessages.map((broadcastMessage, index) => (
                                <React.Fragment key={broadcastMessage.id}>
                                    {isMessageDeleted(index) ? (
                                        <React.Fragment />
                                    ) : (
                                        <ListItem disableGutters sx={{ paddingX: '0.5rem' }}>
                                            <Card
                                                style={{ flex: 1, flexDirection: 'column', borderRadius: '10px' }}
                                                sx={{ paddingTop: (theme) => theme.spacing(0.5) }}
                                            >
                                                <BroadcastMessageAuthor fragmentRef={broadcastMessage} />
                                                <BroadcastMessageContent fragmentRef={broadcastMessage} />
                                            </Card>
                                        </ListItem>
                                    )}
                                </React.Fragment>
                            ))}
                            {broadcastMessages.length === 0 && (
                                <Typography align='center' variant='h5'>
                                    No update messages to display
                                </Typography>
                            )}
                        </List>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}

interface LiveMessageListProps {
    queryRef: PreloadedQuery<LiveMessagesQuery>;
}

function LiveMessageList({ queryRef }: LiveMessageListProps) {
    const { eventBroadcastMessages } = usePreloadedQuery(LIVE_MESSAGES_QUERY, queryRef);
    if (!eventBroadcastMessages) return <Loader />;
    return <MessageList broadcastMessages={eventBroadcastMessages} />;
}

export function PreloadedLiveMessages() {
    const { user, isLoading } = useUser();
    const [queryRef, loadQuery, disposeQuery] = useQueryLoader<LiveMessagesQuery>(LIVE_MESSAGES_QUERY);
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const { eventId } = useEvent();
    const REFRESH_INTERVAL = 15000; // 15 seconds

    const refresh = React.useCallback(() => {
        if (isRefreshing || isLoading) return;
        setIsRefreshing(true);
        loadQuery({ eventId, lang: user?.preferredLang || 'EN' }, { fetchPolicy: 'network-only' });
        setIsRefreshing(false);
    }, [isRefreshing, isLoading, eventId, loadQuery, user?.preferredLang]);

    // Fetches up to date data on initial load and sets up polling
    React.useEffect(() => {
        if (isLoading) return;
        if (!queryRef) loadQuery({ eventId, lang: user?.preferredLang || 'EN' }, { fetchPolicy: 'network-only' });
        const interval = setInterval(refresh, REFRESH_INTERVAL);
        return () => clearInterval(interval);
    }, [eventId, isLoading, loadQuery, queryRef, refresh, user?.preferredLang]);

    React.useEffect(() => {
        return () => disposeQuery();
    }, [disposeQuery]);

    if (!queryRef) return <Loader />;
    return (
        <ConditionalRender client>
            <React.Suspense fallback={<LiveMessageList queryRef={queryRef} />}>
                <LiveMessageList queryRef={queryRef} />
            </React.Suspense>
        </ConditionalRender>
    );
}
