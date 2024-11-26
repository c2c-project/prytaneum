/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { graphql } from 'relay-runtime';
import { Card, Grid, IconButton, List, ListItem, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

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
import { ListActionsContainer, ListContainer, ListToolbar } from '@local/components/ui/List';

export const BROADCAST_MESSAGE_LIST_QUERY = graphql`
    query BroadcastMessageListQuery($eventId: ID!, $lang: String!) {
        eventBroadcastMessages(eventId: $eventId) {
            id
            broadcastMessage
            isVisible
            createdBy {
                firstName
            }
            ...BroadcastMessageActionsFragment
            ...BroadcastMessageAuthorFragment
            ...BroadcastMessageContentFragment @arguments(lang: $lang)
        }
    }
`;

interface MessageListProps {
    fragmentRef: useBroadcastMessageListFragment$key;
    isVisible: boolean;
}

export function BroadcastMessageList({ fragmentRef, isVisible }: MessageListProps) {
    const theme = useTheme();
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);

    const toggleSearch = () => {
        setIsSearchOpen((prev) => !prev);
    };
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
        <ListContainer sx={{ height: '100%' }}>
            <ListToolbar>
                <ListActionsContainer>
                    <Grid item xs='auto'>
                        <IconButton color={isSearchOpen ? 'primary' : 'default'} onClick={toggleSearch}>
                            <Tooltip title='Search Bar' placement='top'>
                                <SearchIcon fontSize='large' />
                            </Tooltip>
                        </IconButton>
                    </Grid>
                    <BroadcastMessageInput />
                </ListActionsContainer>
                <ListFilter
                    style={{ flex: 1, paddingLeft: '0.5rem', paddingRight: '0.5rem' }}
                    onFilterChange={handleFilterChange}
                    onSearch={handleSearch}
                    isSearchOpen={isSearchOpen}
                    length={filteredList.length}
                />
            </ListToolbar>
            <List disablePadding sx={{ overflowY: 'scroll' }}>
                {filteredList.map((broadcastMessage) => (
                    <ListItem key={broadcastMessage.id} disableGutters sx={{ paddingX: '0.5rem' }}>
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
        </ListContainer>
    );
}
