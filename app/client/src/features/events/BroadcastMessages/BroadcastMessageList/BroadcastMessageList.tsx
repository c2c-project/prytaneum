/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { graphql } from 'relay-runtime';
import { Card, Grid, List, ListItem, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import ListFilter, { useFilters, Accessors } from '@local/components/ListFilter';
import { ArrayElement } from '@local/utils/ts-utils';
import { BroadcastMessageAuthor } from '../BroadcastMessageAuthor';
import { BroadcastMessageContent } from '../BroadcastMessageContent';
import { BroadcastMessageActions } from '../BroadcastMessageActions/BroadcastMessageActions';
import { BroadcastMessageInput } from '../BroadcastMessageInput';
import { useBroadcastMessageCreated } from './useBroadcastMessageCreated';
import { useBroadcastMessageList } from './useBroadcastMessageList';
import { useBroadcastMessageDeleted } from './useBroadcastMessageDeleted';
import { useBroadcastMessageListFragment$key } from '@local/__generated__/useBroadcastMessageListFragment.graphql';

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

interface MessageListProps {
    fragmentRef: useBroadcastMessageListFragment$key;
    isVisible: boolean;
}

export function BroadcastMessageList({ fragmentRef, isVisible }: MessageListProps) {
    const theme = useTheme();
    const { broadcastMessages, connections } = useBroadcastMessageList({ fragmentRef });
    useBroadcastMessageCreated({ connections });
    useBroadcastMessageDeleted({ connections });

    const accessors = React.useMemo<Accessors<ArrayElement<typeof broadcastMessages>>[]>(
        () => [
            (q) => q?.broadcastMessage || '', // broadcast message text itself
            (q) => q?.createdBy?.firstName || '', // first name of the user
        ],
        []
    );

    const [filteredList, handleSearch, handleFilterChange] = useFilters(broadcastMessages, accessors);

    if (!isVisible) return <React.Fragment />;

    return (
        <Grid container height={0} flex='1 1 100%'>
            <Grid item paddingTop='1rem' xs={12}>
                <Grid alignContent='flex-start' container>
                    <Grid container direction='row' justifyContent='space-evenly' paddingBottom='1rem'>
                        <Grid item>
                            <BroadcastMessageInput />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <ListFilter
                            style={{ flex: 1, paddingLeft: '0.5rem', paddingRight: '0.5rem' }}
                            onFilterChange={handleFilterChange}
                            onSearch={handleSearch}
                            isSearchOpen={true}
                            length={filteredList.length}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <List disablePadding>
                            {filteredList.map((broadcastMessage) => (
                                <React.Fragment key={broadcastMessage.id}>
                                    <ListItem disableGutters sx={{ paddingX: '0.5rem' }}>
                                        <Card
                                            style={{
                                                flex: 1,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                paddingTop: theme.spacing(0.5),
                                                borderRadius: '10px',
                                            }}
                                        >
                                            <BroadcastMessageAuthor fragmentRef={broadcastMessage} />
                                            <BroadcastMessageContent fragmentRef={broadcastMessage} />
                                            <Grid container alignItems='center' justifyContent='space-between'>
                                                <BroadcastMessageActions
                                                    deleteEnabled={true}
                                                    // TODO: Reinstate edit functionality once updated to dialog
                                                    editEnabled={false}
                                                    fragmentRef={broadcastMessage}
                                                />
                                            </Grid>
                                        </Card>
                                    </ListItem>
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
        </Grid>
    );
}
