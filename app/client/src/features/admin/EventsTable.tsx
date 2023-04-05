import * as React from 'react';
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

import { Form, TablePaginationActions } from '@local/components';
import type { useEventsDashboardFragment$key } from '@local/__generated__/useEventsDashboardFragment.graphql';
import { useEventsDashboard } from './useEventsDashboard';
import { useForm } from '@local/core';

export type EventsDashboardSearchFilter = {
    orgName: string;
    eventName: string;
};

interface SearchBarProps {
    handleSearchFilter: (filter: EventsDashboardSearchFilter) => void;
}

// TODO: Add filtering for current results (Ie. filter by column (asc/desc))
function SearchBar({ handleSearchFilter }: SearchBarProps) {
    const initialState = {
        orgName: '',
        eventName: '',
    };
    const [form, , handleSubmit, handleChange] = useForm(initialState);
    return (
        <Form
            onSubmit={handleSubmit((_form) => {
                handleSearchFilter(_form);
            })}
        >
            <Grid container paddingX='2rem' paddingY='1rem' columnSpacing='1rem' alignItems='center'>
                {/* <Grid item>
                    <TextField
                        label='Org Name'
                        aria-label='Org Name'
                        value={form.orgName}
                        onChange={handleChange('orgName')}
                    />
                </Grid> */}
                <Grid item>
                    <TextField
                        label='Event Name'
                        aria-label='Event Name'
                        value={form.eventName}
                        onChange={handleChange('eventName')}
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

interface EventsTableProps {
    fragmentRef: useEventsDashboardFragment$key;
}

export function EventsTable({ fragmentRef }: EventsTableProps) {
    const { events, hasNext, loadNext, isLoadingNext, refresh } = useEventsDashboard({ fragmentRef });
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const date = new Date();
    const FETCH_AMMOUNT = 100;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = React.useMemo(
        () => (page > 0 ? Math.max(0, (1 + page) * rowsPerPage - events.length) : 0),
        [page, rowsPerPage, events.length]
    );

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // const handleDelete = (id: string) => {
    //     console.log(id);
    //     // TODO: Confirmation dialog
    // };
    // const handleEdit = (id: string) => {
    //     console.log(id);
    //     // TODO: Implement edit button to premote/demote as organizers
    // };

    const handleSearchFilter = (filter: EventsDashboardSearchFilter) => {
        refresh(filter);
    };

    const handleLoadNext = React.useCallback(() => {
        if (hasNext && !isLoadingNext) loadNext(FETCH_AMMOUNT);
    }, [hasNext, loadNext, isLoadingNext]);

    const usersListLength = React.useMemo(() => events.length, [events]);
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
            <TableContainer style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
                <Table sx={{ minWidth: 650 }} aria-label='dashboard-table'>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: 250 }}>
                                <Typography fontWeight='bold'>Title</Typography>
                            </TableCell>
                            <TableCell style={{ width: 250 }}>
                                <Typography fontWeight='bold'>Organization</Typography>
                            </TableCell>
                            <TableCell style={{ width: 200 }}>
                                <Typography fontWeight='bold'>Start Date</Typography>
                            </TableCell>
                            <TableCell style={{ width: 200 }}>
                                <Typography fontWeight='bold'>End Date</Typography>
                            </TableCell>
                            {/* <TableCell />
                            <TableCell /> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : events
                        ).map((event) => (
                            <TableRow key={event.id}>
                                <TableCell>
                                    <Typography>{event.title}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>{event.organization?.name}</Typography>
                                </TableCell>
                                <TableCell>
                                    {/* TODO: Get this from the backend */}
                                    <Typography>
                                        {new Date(event.startDateTime || date).toLocaleDateString() +
                                            ' ' +
                                            new Date(event.startDateTime || date).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {/* TODO: Get this from the backend */}
                                    <Typography>
                                        {new Date(event.endDateTime || date).toLocaleDateString() +
                                            ' ' +
                                            new Date(event.endDateTime || date).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                    </Typography>
                                </TableCell>
                                {/* <TableCell>
                                    <Button variant='contained' onClick={() => handleEdit(event.id)}>
                                        Edit
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant='contained' color='error' onClick={() => handleDelete(event.id)}>
                                        Delete
                                    </Button>
                                </TableCell> */}
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
