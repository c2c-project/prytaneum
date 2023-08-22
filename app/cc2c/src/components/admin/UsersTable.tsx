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
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

import { useForm } from '@local/lib';
import type { User } from '@local/lib';
import { TablePaginationActions } from '../TablePaginationActions';
import { getAllUsers, loadNextPage, refresh } from './actions';

export type UsersTableSearchFilter = {
    name: string;
    email: string;
};

interface UsersTableSearchBarProps {
    handleSearchFilter: (filter: UsersTableSearchFilter) => void;
}

function SearchBar({ handleSearchFilter }: UsersTableSearchBarProps) {
    const initialState = { name: '', email: '' };
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
                <TextField label='Name' aria-label='Name' value={form.name} onChange={handleChange('name')} />
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

    const date = new Date();
    const FETCH_AMMOUNT = 100;

    const [users, setUsers] = React.useState<User[]>([]);
    const [isLoadingNext, setIsLoadingNext] = React.useState<boolean>(false);
    const [hasNext, setHasNext] = React.useState<boolean>(false);
    const [filter, setFilter] = React.useState<UsersTableSearchFilter>({ name: '', email: '' });

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
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchFilter = (filter: UsersTableSearchFilter) => {
        setFilter(filter);
        refresh(FETCH_AMMOUNT, filter).then(({ users, hasNextPage }) => {
            console.log(users);
            setUsers(users);
            setHasNext(hasNextPage);
        });
    };

    const handleLoadNext = React.useCallback(() => {
        if (hasNext && !isLoadingNext) {
            setIsLoadingNext(true);
            loadNextPage(FETCH_AMMOUNT, page, filter).then(({ users, hasNextPage }) => {
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
                                <Typography fontWeight='bold'>Name</Typography>
                            </TableCell>
                            <TableCell style={{ width: 250 }}>
                                <Typography fontWeight='bold'>Email</Typography>
                            </TableCell>
                            <TableCell style={{ width: 150 }}>
                                <Typography fontWeight='bold'>User Type</Typography>
                            </TableCell>
                            <TableCell style={{ width: 200 }}>
                                <Typography fontWeight='bold'>Last Login Date</Typography>
                            </TableCell>
                            <TableCell />
                            {/* <TableCell /> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : users
                        ).map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Typography>{user.name}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>{user.email}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>{user.role.toLocaleLowerCase()}</Typography>
                                </TableCell>
                                <TableCell>
                                    {/* TODO: Get this from the backend */}
                                    <Typography>
                                        {date.toLocaleDateString() +
                                            ' ' +
                                            date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </Typography>
                                </TableCell>
                                <TableCell></TableCell>
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
        </React.Fragment>
    );
}
