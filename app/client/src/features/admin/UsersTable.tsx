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
    TableFooter,
    Box,
    TablePagination,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Search as SearchIcon } from '@mui/icons-material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

import { Form } from '@local/components';
import type { useUsersDashboardFragment$key } from '@local/__generated__/useUsersDashboardFragment.graphql';
import { useUsersDashboard } from './useUsersDashboard';
import { useForm } from '@local/core';

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label='first page'>
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label='previous page'>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label='next page'
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label='last page'
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

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
                            handleSubmit((_form) => {
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

export function UsersTable({ fragmentRef }: UsersTableProps) {
    const { users, hasNext, loadNext, isLoadingNext, refetch } = useUsersDashboard({ fragmentRef });
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const date = new Date();
    const FETCH_AMMOUNT = 50;

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

    const handleDelete = (id: string) => {
        console.log(id);
        // TODO: Confirmation dialog
    };
    const handleEdit = (id: string) => {
        console.log(id);
        // TODO: Implement edit button to premote/demote as organizers
    };

    const handleSearchFilter = (filter: UsersDashboardSearchFilter) => {
        refetch({
            filter: { firstName: filter.firstName, lastName: filter.lastName, email: filter.email },
        });
    };

    const handleLoadNext = React.useCallback(() => {
        if (hasNext) loadNext(FETCH_AMMOUNT);
    }, [hasNext, loadNext]);

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
                <SearchBar handleSearchFilter={handleSearchFilter} />
            </Grid>
            {usersListLength > 0 ? (
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
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : users
                            ).map((user) => (
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
                                        {/* TODO: Get this from the backend */}
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
