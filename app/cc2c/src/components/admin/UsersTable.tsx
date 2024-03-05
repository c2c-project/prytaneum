'use client';

import React from 'react';
import {
    Grid,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField,
    IconButton,
    TableFooter,
    TablePagination,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

import { useForm } from '@local/lib';
import type { User } from '@local/lib';
import { TablePaginationActions } from '../TablePaginationActions';
import { deleteUser, demoteUser, getAllUsers, loadNextPageUsers, promoteUser, refreshUsers } from './actions';
import { useSnackbar } from 'notistack';

export type UsersTableSearchFilter = {
    firstName: string;
    lastName: string;
    email: string;
};

interface UsersTableSearchBarProps {
    handleSearchFilter: (filter: UsersTableSearchFilter) => void;
}

function SearchBar({ handleSearchFilter }: UsersTableSearchBarProps) {
    const initialState = { firstName: '', lastName: '', email: '' };
    const [form, , handleSubmit, handleChange] = useForm(initialState);

    return (
        <Grid
            container
            component='form'
            onSubmit={handleSubmit((_form) => {
                handleSearchFilter(_form);
            })}
            paddingX='2rem'
            paddingY='1rem'
            columnSpacing='1rem'
            alignItems='center'
        >
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
                <TextField label='Email' aria-label='Email' value={form.email} onChange={handleChange('email')} />
            </Grid>
            <Grid item>
                <IconButton aria-label='search button' type='submit'>
                    <SearchIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
}

interface UsersTableProps {}

export function UsersTable({}: UsersTableProps) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const FETCH_AMMOUNT = 100;

    const [users, setUsers] = React.useState<User[]>([]);
    const [isLoadingNext, setIsLoadingNext] = React.useState<boolean>(false);
    const [hasNext, setHasNext] = React.useState<boolean>(false);
    const [filter, setFilter] = React.useState<UsersTableSearchFilter>({ firstName: '', lastName: '', email: '' });
    const [openDialog, setOpenDialog] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState<User>();
    const snackbar = useSnackbar();

    const handleOpenDialog = (userId: string) => {
        const user = users.find((user) => user.id === userId);
        setSelectedUser(user);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleConfirmDeleteUser = async () => {
        // Get the user id from the selected user
        const userId = selectedUser?.id;
        // Call delete user action
        console.log('Delete user with id: ', userId);
        if (!userId) {
            console.error('No selected user id provided');
            snackbar.enqueueSnackbar('Error deleting user', { variant: 'error' });
            return;
        }
        const { isError, message } = await deleteUser(userId);
        if (isError) {
            console.error(message);
            snackbar.enqueueSnackbar(message, { variant: 'error' });
            return;
        }
        // Success, show snackbar message and refresh users
        refreshUsers(FETCH_AMMOUNT, filter).then(({ users, hasNextPage }) => {
            setUsers(users);
            setHasNext(hasNextPage);
        });
        snackbar.enqueueSnackbar(message, { variant: 'success' });
        // Close the dialog
        handleCloseDialog();
    };

    React.useEffect(() => {
        getAllUsers(FETCH_AMMOUNT).then(({ users, hasNextPage }) => {
            setUsers(users);
            setHasNext(hasNextPage);
        });
    }, []);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = React.useMemo(
        () => (page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0),
        [page, rowsPerPage, users.length]
    );

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        event?.preventDefault();
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchFilter = (filter: UsersTableSearchFilter) => {
        setFilter(filter);
        refreshUsers(FETCH_AMMOUNT, filter).then(({ users, hasNextPage }) => {
            setUsers(users);
            setHasNext(hasNextPage);
        });
    };

    const handleLoadNext = React.useCallback(() => {
        if (hasNext && !isLoadingNext) {
            setIsLoadingNext(true);
            loadNextPageUsers(FETCH_AMMOUNT, page, filter).then(({ users, hasNextPage }) => {
                setUsers(users);
                setHasNext(hasNextPage);
                setIsLoadingNext(false);
            });
        }
    }, [filter, hasNext, isLoadingNext, page]);

    const usersListLength = React.useMemo(() => users.length, [users]);
    const nextPageIsLastPage = React.useMemo(
        () => page + 1 > Math.ceil(usersListLength / rowsPerPage) - 1,
        [page, rowsPerPage, usersListLength]
    );

    const handlePromoteUser = (userId: string) => () => {
        promoteUser(userId).then(({ isError, message }) => {
            refreshUsers(FETCH_AMMOUNT, filter).then(({ users, hasNextPage }) => {
                setUsers(users);
                setHasNext(hasNextPage);
            });
        });
    };

    const handleDemoteUser = (userId: string) => () => {
        demoteUser(userId).then(({ isError, message }) => {
            refreshUsers(FETCH_AMMOUNT, filter).then(({ users, hasNextPage }) => {
                setUsers(users);
                setHasNext(hasNextPage);
            });
        });
    };

    React.useEffect(() => {
        if (nextPageIsLastPage) handleLoadNext();
    }, [handleLoadNext, nextPageIsLastPage]);

    return (
        <React.Fragment>
            <Grid container justifyContent='center'>
                <Typography variant='h4' fontWeight='bold'>
                    Users Table
                </Typography>
            </Grid>
            <SearchBar handleSearchFilter={handleSearchFilter} />
            <TableContainer style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
                <Table sx={{ minWidth: 650 }} aria-label='dashboard-table'>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: 250 }}>
                                <Typography fontWeight='bold'>First Name</Typography>
                            </TableCell>
                            <TableCell style={{ width: 250 }}>
                                <Typography fontWeight='bold'>Last Name</Typography>
                            </TableCell>
                            <TableCell style={{ width: 250 }}>
                                <Typography fontWeight='bold'>Email</Typography>
                            </TableCell>
                            <TableCell style={{ width: 150 }}>
                                <Typography fontWeight='bold'>User Role</Typography>
                            </TableCell>
                            <TableCell style={{ width: 150 }}>
                                <Typography fontWeight='bold'>Actions</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : users
                        ).map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Typography>{user.firstName}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>{user.lastName}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>{user.email}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>{user.role.toLocaleLowerCase()}</Typography>
                                </TableCell>
                                <TableCell>
                                    {user.role === 'STUDENT' ? (
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            onClick={handlePromoteUser(user.id)}
                                        >
                                            Promote
                                        </Button>
                                    ) : (
                                        <Button variant='contained' color='primary' onClick={handleDemoteUser(user.id)}>
                                            Demote
                                        </Button>
                                    )}
                                    <Button variant='contained' color='error' onClick={() => handleOpenDialog(user.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 70 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                count={usersListLength}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                rowsPerPageOptions={[5, 10, 25]}
                                labelRowsPerPage={<span>Rows per page:</span>}
                                labelDisplayedRows={({ page: _page }) => {
                                    return `Page: ${_page + 1}`;
                                }}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'page number',
                                    },
                                    style: { width: '4rem' },
                                }}
                                showFirstButton={true}
                                showLastButton={true}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirm Action</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete user: {selectedUser?.email}?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color='primary'>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDeleteUser} color='primary' autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
