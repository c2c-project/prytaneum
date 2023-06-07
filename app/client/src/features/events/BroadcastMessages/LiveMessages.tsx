/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { Card, Grid, List, ListItem, Paper, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { useEvent } from '@local/features/events';
import { ConditionalRender } from '@local/components/ConditionalRender';
import { Loader } from '@local/components/Loader';
import { fetchQuery, FragmentRefs, graphql } from 'relay-runtime';
import { PreloadedQuery, usePreloadedQuery, useQueryLoader } from 'react-relay';
import { BroadcastMessageAuthor } from './BroadcastMessageAuthor';
import { BroadcastMessageContent } from './BroadcastMessageContent';
import { LiveMessagesQuery } from '@local/__generated__/LiveMessagesQuery.graphql';
import { useEnvironment } from '@local/core';

const useStyles = makeStyles((theme) => ({
    listFilter: {
        flex: 1,
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
    },
    content: {
        height: 0, // flex box recalculates this -- explanation:  https://stackoverflow.com/a/14964944
        flex: '1 1 100%',
    },
    broadcastMessageActions: {
        display: 'flex',
        justifyContent: 'center',
    },
    item: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: theme.spacing(0.5),
        borderRadius: '10px',
    },
    filler: {
        visibility: 'hidden',
    },
    text: {
        margin: 'auto',
    },
}));

export const LIVE_MESSAGES_QUERY = graphql`
    query LiveMessagesQuery($eventId: ID!) {
        eventBroadcastMessages(eventId: $eventId) {
            id
            broadcastMessage
            isVisible
            createdBy {
                firstName
            }
            ...BroadcastMessageAuthorFragment
            ...BroadcastMessageContentFragment
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
    const classes = useStyles();

    const isMessageDeleted = React.useCallback(
        (index: number) => {
            return deletedMessageIndex !== null && index === deletedMessageIndex;
        },
        [deletedMessageIndex]
    );

    return (
        <Paper>
            <Grid
                item
                container
                height='180px'
                style={{
                    overflowY: 'scroll',
                }}
            >
                <Grid alignContent='center' justifyContent='center' container>
                    <Grid item width='90%'>
                        <List disablePadding>
                            {broadcastMessages.map((broadcastMessage, index) => (
                                <React.Fragment key={broadcastMessage.id}>
                                    {isMessageDeleted(index) ? (
                                        <React.Fragment />
                                    ) : (
                                        <ListItem disableGutters sx={{ paddingX: '0.5rem' }}>
                                            <Card className={classes.item}>
                                                <BroadcastMessageAuthor fragmentRef={broadcastMessage} />
                                                <BroadcastMessageContent fragmentRef={broadcastMessage} />
                                            </Card>
                                        </ListItem>
                                    )}
                                </React.Fragment>
                            ))}
                            {broadcastMessages.length === 0 && (
                                <Typography align='center' variant='h5'>
                                    No broadcasted messages to display
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
    const [queryRef, loadQuery, disposeQuery] = useQueryLoader<LiveMessagesQuery>(LIVE_MESSAGES_QUERY);
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const { env } = useEnvironment();
    const { eventId } = useEvent();
    const REFRESH_INTERVAL = 15000; // 15 seconds

    const refresh = React.useCallback(() => {
        if (isRefreshing) return;
        setIsRefreshing(true);
        fetchQuery(env, LIVE_MESSAGES_QUERY, { eventId }).subscribe({
            complete: () => {
                setIsRefreshing(false);
                loadQuery({ eventId }, { fetchPolicy: 'store-or-network' });
            },
            error: () => {
                setIsRefreshing(false);
            },
        });
    }, [env, isRefreshing, loadQuery, eventId]);

    // Fetches up to date data on initial load and sets up polling
    React.useEffect(() => {
        if (!queryRef) loadQuery({ eventId }, { fetchPolicy: 'network-only' });
        const interval = setInterval(refresh, REFRESH_INTERVAL);
        return () => clearInterval(interval);
    }, [eventId, loadQuery, queryRef, refresh]);

    React.useEffect(() => {
        return () => disposeQuery();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!queryRef) return <Loader />;
    return (
        <ConditionalRender client>
            <React.Suspense fallback={<LiveMessageList queryRef={queryRef} />}>
                <LiveMessageList queryRef={queryRef} />
            </React.Suspense>
        </ConditionalRender>
    );
}
