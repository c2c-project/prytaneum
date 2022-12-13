import * as React from 'react';
import { graphql, useQueryLoader, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import {
    Grid,
    Paper,
    Typography,
    Button,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@mui/material';

import { Loader } from '@local/components';
import type { UsersDashboardQuery } from '@local/__generated__/UsersDashboardQuery.graphql';

const USERS_DASHBOARD_QUERY = graphql`
    query UsersDashboardQuery {
        users {
            id
            firstName
            lastName
            email
            avatar
            isAdmin
            canMakeOrgs
        }
    }
`;

interface SearchBarProps {}

function SearchBar({}: SearchBarProps) {
    return (
        <Grid>
            <Typography>Search Bar</Typography>
        </Grid>
    );
}

interface UsersListProps {
    queryRef: PreloadedQuery<UsersDashboardQuery>;
}

// TODO: Use a filter for list based on search bar input
// TODO: Use virtualized table here
function UsersList({ queryRef }: UsersListProps) {
    const { users } = usePreloadedQuery(USERS_DASHBOARD_QUERY, queryRef);
    const date = new Date();

    const handleDelete = (id: string) => {
        console.log(id);
        // TODO: Confirmation dialog
    };
    const handleEdit = (id: string) => {
        console.log(id);
        // TODO: Implement edit button to premote/demote as organizers
    };

    return (
        <Grid container>
            <Grid container justifyContent='center'>
                <SearchBar />
            </Grid>
            {users.length > 0 ? (
                <TableContainer style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography fontWeight='bold'>Name</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>Email</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>User Type</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>Last Login Date</Typography>
                                </TableCell>
                                <TableCell />
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <Typography fontWeight='bold'>
                                            {user.firstName + ' ' + user.lastName}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{user.email}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{user.canMakeOrgs ? 'Organizer' : 'Participant'}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            {date.toLocaleDateString() + ' ' + date.toLocaleTimeString()}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant='contained' onClick={() => handleEdit(user.id)}>
                                            Edit
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant='contained' color='error' onClick={() => handleDelete(user.id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Grid item container justifyContent='center' paddingY='2rem'>
                    <Typography>No users to display</Typography>
                </Grid>
            )}
        </Grid>
    );
}

function PreloadedUsersList() {
    const [query, loadQuery, disposeQuery] = useQueryLoader<UsersDashboardQuery>(USERS_DASHBOARD_QUERY);

    React.useEffect(() => {
        if (!query) loadQuery({}, { fetchPolicy: 'network-only' });
    }, [query, loadQuery]);

    React.useEffect(() => {
        return () => disposeQuery();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!query) return <Loader />;
    return <UsersList queryRef={query} />;
}

export function UsersDashboard() {
    return (
        <Paper>
            <Grid container>
                <Grid item paddingLeft='1rem'>
                    <Typography variant='h4'>Admin Dashboard: Users</Typography>
                </Grid>
                <React.Suspense fallback={<Loader />}>
                    <PreloadedUsersList />
                </React.Suspense>
            </Grid>
        </Paper>
    );
}
