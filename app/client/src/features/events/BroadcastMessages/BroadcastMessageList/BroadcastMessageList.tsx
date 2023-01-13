/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { Card, Grid, List, ListItem, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import ListFilter, { useFilters, Accessors } from '@local/components/ListFilter';
import { ArrayElement } from '@local/utils/ts-utils';
import { useEvent } from '@local/features/events';
import { ConditionalRender } from '@local/components/ConditionalRender';
import { Loader } from '@local/components/Loader';
import { fetchQuery, FragmentRefs, graphql } from 'relay-runtime';
import { PreloadedQuery, usePreloadedQuery, useQueryLoader } from 'react-relay';
import { BroadcastMessageAuthor } from '../BroadcastMessageAuthor';
import { BroadcastMessageContent } from '../BroadcastMessageContent';
import { BroadcastMessageActions } from '../BroadcastMessageActions/BroadcastMessageActions';
import { BroadcastMessageListQuery } from '@local/__generated__/BroadcastMessageListQuery.graphql';
import { useEnvironment } from '@local/core';

const useStyles = makeStyles((theme) => ({
    listFilter: {
        flex: 1,
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

export const BROADCAST_MESSAGE_LIST_QUERY = graphql`
    query BroadcastMessageListQuery($eventId: ID!) {
        eventBroadcastMessages(eventId: $eventId) {
            id
            broadcastMessage
            isVisible
            createdBy {
                firstName
            }
            ...BroadcastMessageActionsFragment
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
    readonly ' $fragmentSpreads': FragmentRefs<
        'BroadcastMessageActionsFragment' | 'BroadcastMessageAuthorFragment' | 'BroadcastMessageContentFragment'
    >;
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
    const { isModerator } = useEvent();

    const accessors = React.useMemo<Accessors<ArrayElement<typeof broadcastMessages>>[]>(
        () => [
            (q) => q?.broadcastMessage || '', // broadcast message text itself
            (q) => q?.createdBy?.firstName || '', // first name of the user
        ],
        []
    );

    const onBroadcastMessageDelete = React.useCallback(
        (messageId: string) => {
            const index = broadcastMessages.findIndex((message) => message.id === messageId);
            if (index !== -1) {
                setDeletedMessageIndex(index);
            }
        },
        [broadcastMessages]
    );

    const isMessageDeleted = React.useCallback(
        (index: number) => {
            return deletedMessageIndex !== null && index === deletedMessageIndex;
        },
        [deletedMessageIndex]
    );

    const [filteredList, handleSearch, handleFilterChange] = useFilters(broadcastMessages, accessors);

    return (
        <Grid alignContent='flex-start' container>
            <Grid item xs={12}>
                <ListFilter onFilterChange={handleFilterChange} onSearch={handleSearch} length={filteredList.length} />
            </Grid>
            <Grid container height={0} flex='1 1 100%'>
                <Grid item xs={12}>
                    <List disablePadding>
                        {filteredList.map((broadcastMessage, index) => (
                            <React.Fragment key={broadcastMessage.id}>
                                {isMessageDeleted(index) ? (
                                    <React.Fragment />
                                ) : (
                                    <ListItem disableGutters>
                                        <Card className={classes.item}>
                                            <BroadcastMessageAuthor fragmentRef={broadcastMessage} />
                                            <BroadcastMessageContent fragmentRef={broadcastMessage} />
                                            <Grid container alignItems='center' justifyContent='space-between'>
                                                <BroadcastMessageActions
                                                    style={
                                                        !isModerator
                                                            ? { width: '100%' }
                                                            : { width: '100%', maxWidth: '10rem' }
                                                    }
                                                    className={classes.broadcastMessageActions}
                                                    deleteEnabled={isModerator}
                                                    editEnabled={isModerator}
                                                    connections={[]}
                                                    fragmentRef={broadcastMessage}
                                                    onBroadcastMessageDelete={onBroadcastMessageDelete}
                                                />
                                            </Grid>
                                        </Card>
                                    </ListItem>
                                )}
                            </React.Fragment>
                        ))}
                        {filteredList.length === 0 && broadcastMessages.length !== 0 && (
                            <Typography align='center' variant='body2'>
                                No results to display
                            </Typography>
                        )}
                        {broadcastMessages.length === 0 && (
                            <Typography align='center' variant='h5'>
                                No broadcasted messages to display
                            </Typography>
                        )}
                    </List>
                </Grid>
            </Grid>
        </Grid>
    );
}

interface BroadcastMessageListProps {
    queryRef: PreloadedQuery<BroadcastMessageListQuery>;
}

function BroadcastMessageList({ queryRef }: BroadcastMessageListProps) {
    const { eventBroadcastMessages } = usePreloadedQuery(BROADCAST_MESSAGE_LIST_QUERY, queryRef);
    if (!eventBroadcastMessages) return <Loader />;
    return <MessageList broadcastMessages={eventBroadcastMessages} />;
}

export interface PreloadedBroadcastMessageListProps {
    isVisible: boolean;
}

export function PreloadedBroadcastMessageList({ isVisible }: PreloadedBroadcastMessageListProps) {
    const [queryRef, loadQuery, disposeQuery] = useQueryLoader<BroadcastMessageListQuery>(BROADCAST_MESSAGE_LIST_QUERY);
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const { env } = useEnvironment();
    const { eventId } = useEvent();
    const REFRESH_INTERVAL = 15000; // 15 seconds

    const refresh = React.useCallback(() => {
        if (isRefreshing) return;
        setIsRefreshing(true);
        fetchQuery(env, BROADCAST_MESSAGE_LIST_QUERY, { eventId }).subscribe({
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
            <React.Suspense fallback={<BroadcastMessageList queryRef={queryRef} />}>
                {isVisible && <BroadcastMessageList queryRef={queryRef} />}
            </React.Suspense>
        </ConditionalRender>
    );
}
