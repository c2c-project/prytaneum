import * as React from 'react';
import {
    Grid,
    Typography,
    Button,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField,
    IconButton,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

import { Form } from '@local/components';
import type { useUsersDashboardFragment$key } from '@local/__generated__/useUsersDashboardFragment.graphql';
import { useUsersDashboard } from './useUsersDashboard';
import { useForm } from '@local/core';

type UsersDashboardSearchFilter = {
    firstName: string;
    lastName: string;
    email: string;
};

interface SearchBarProps {
    handleSearchFilter: (filter: UsersDashboardSearchFilter) => void;
}

// TODO: Add filtering for current results (Ie. filter by column (asc/desc))
function SearchBar({ handleSearchFilter }: SearchBarProps) {
    const initialState = {
        firstName: '',
        lastName: '',
        email: '',
    };
    const [form, , handleSubmit, handleChange] = useForm(initialState);
    return (
        <Form
            onSubmit={handleSubmit((_form) => {
                handleSearchFilter(_form);
            })}
        >
            <Grid container paddingX='2rem' paddingY='1rem' columnSpacing='1rem' alignItems='center'>
                <Grid item>
                    <TextField
                        label='First Name'
                        aria-label='First Name'
                        value={form.firstName}
                        onChange={handleChange('firstName')}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label='Last Name'
                        aria-label='Last Name'
                        value={form.lastName}
                        onChange={handleChange('lastName')}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        type='email'
                        label='Email'
                        aria-label='Email'
                        value={form.email}
                        onChange={handleChange('email')}
                    />
                </Grid>
                <Grid item>
                    <IconButton
                        aria-label='search button'
                        type='submit'
                        onClick={() => {
                            console.log('clicked');
                            handleSubmit((_form) => {
                                console.log('FORM: ', _form);
                                handleSearchFilter(_form);
                            });
                        }}
                    >
                        <SearchIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Form>
    );
}

interface UsersTableProps {
    fragmentRef: useUsersDashboardFragment$key;
}

// TODO: Use virtualized table here
export function UsersTable({ fragmentRef }: UsersTableProps) {
    const { usersList, hasNext, loadNext, isLoadingNext, refetch } = useUsersDashboard({ fragmentRef });
    const date = new Date();
    const FETCH_AMMOUNT = 50;

    const handleDelete = (id: string) => {
        console.log(id);
        // TODO: Confirmation dialog
    };
    const handleEdit = (id: string) => {
        console.log(id);
        // TODO: Implement edit button to premote/demote as organizers
    };

    const handleLoadNext = () => {
        if (hasNext) loadNext(FETCH_AMMOUNT);
    };

    const handleSearchFilter = (filter: UsersDashboardSearchFilter) => {
        console.log(filter);
        refetch({
            filter: { firstName: filter.firstName, lastName: filter.lastName, email: filter.email },
        });
    };

    const usersListLength = React.useMemo(() => usersList.length, [usersList]);

    return (
        <React.Fragment>
            <Grid container justifyContent='center'>
                <SearchBar handleSearchFilter={handleSearchFilter} />
            </Grid>
            {usersListLength > 0 ? (
                <TableContainer style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
                    <Table sx={{ minWidth: 650 }} aria-label='dashboard-table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography fontWeight='bold'>Name</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight='bold'>Email</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight='bold'>User Type</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight='bold'>Last Login Date</Typography>
                                </TableCell>
                                <TableCell />
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usersList.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <Typography>{user.firstName + ' ' + user.lastName}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{user.email}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{user.canMakeOrgs ? 'Organizer' : 'Participant'}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            {date.toLocaleDateString() +
                                                ' ' +
                                                date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
                    <Typography>No users found</Typography>
                </Grid>
            )}
            {hasNext ? (
                <Grid container justifyContent='center' paddingY='2rem'>
                    <Button variant='contained' disabled={isLoadingNext} onClick={handleLoadNext}>
                        Load More
                    </Button>
                </Grid>
            ) : (
                <React.Fragment />
            )}
        </React.Fragment>
    );
}
