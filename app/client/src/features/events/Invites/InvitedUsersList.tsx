import * as React from 'react';
import {
    Grid,
    List,
    ListItem,
    Paper,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    Avatar,
    Typography,
} from '@mui/material';

import { useEvent } from '../useEvent';
import { useInvitedUsers } from './useInvitedUsers';
import ListFilter, { Accessors, useFilters } from '@local/components/ListFilter';
import { ArrayElement } from '@local/utils/ts-utils';
import { useInvitedUsersListFragment$key } from '@local/__generated__/useInvitedUsersListFragment.graphql';
import { useUserInvited } from './useUserInvited';
import { UninviteUser } from './UninviteUser';
import { useUserUninvited } from './useUserUninvited';

export type Participant = {
    readonly id: string;
    readonly firstName: string | null;
    readonly lastName: string | null;
    readonly moderatorOf: boolean;
    readonly isMuted: boolean;
};

interface InvitedUsersListProps {
    isVisible: boolean;
    fragmentRef: useInvitedUsersListFragment$key;
}

export function InvitedUsersList({ isVisible, fragmentRef }: InvitedUsersListProps) {
    const { eventId } = useEvent();
    const { invitedUsers, connections, refresh } = useInvitedUsers({ fragmentRef, eventId });

    useUserInvited({ connections, eventId, onNext: refresh });
    useUserUninvited({ connections, eventId });

    const accessors = React.useMemo<Accessors<ArrayElement<typeof invitedUsers>>[]>(
        () => [
            (q) => q?.firstName || '', // question text itself
            (q) => q?.lastName || '', // first name of the user
        ],
        []
    );

    const [filteredList, handleSearch, handleFilterChange] = useFilters(invitedUsers, accessors);

    if (!isVisible) return <React.Fragment />;

    return (
        <React.Fragment>
            <Typography variant='h6'>Invited Users List</Typography>
            <Grid container display='grid' maxHeight={'300px'} style={{ overflowY: 'scroll' }}>
                <Grid item paddingTop='1rem'>
                    {invitedUsers.length === 0 && <p>No invitedUsers yet</p>}
                    <Grid item container alignItems='center' justifyContent='center'>
                        <ListFilter
                            style={{ width: '80%' }}
                            onFilterChange={handleFilterChange}
                            onSearch={handleSearch}
                            length={filteredList.length}
                        />
                    </Grid>
                    <Grid item container alignItems='center' justifyContent='center'>
                        <List disablePadding style={{ width: '80%' }}>
                            {filteredList.map((invitee) => (
                                <Paper key={invitee.id} style={{ marginBottom: '1rem' }}>
                                    <ListItem disableGutters>
                                        <ListItemAvatar>
                                            <Avatar src={undefined} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={invitee.firstName + ' ' + invitee.lastName}
                                            secondary={invitee.email}
                                        />
                                        <ListItemSecondaryAction>
                                            <UninviteUser eventId={eventId} userId={invitee.id} />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </Paper>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
