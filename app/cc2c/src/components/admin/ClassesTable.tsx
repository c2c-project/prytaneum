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
import { getAllClasses, loadNextPageClasses, refreshClasses } from './actions';
import { Class } from '@local/server';

export type ClassesTableSearchFilter = {
    termId: string;
    name: string;
};

interface ClassesTableSearchBarProps {
    handleSearchFilter: (filter: ClassesTableSearchFilter) => void;
}

function SearchBar({ handleSearchFilter }: ClassesTableSearchBarProps) {
    const initialState = { termId: '', name: '' };
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
                <TextField label='Term Id' aria-label='Term Id' value={form.termId} onChange={handleChange('termId')} />
            </Grid>
            <Grid item>
                <TextField label='Name' aria-label='Name' value={form.name} onChange={handleChange('name')} />
            </Grid>
            <Grid item>
                <IconButton aria-label='search button' type='submit'>
                    <SearchIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
}

interface ClassesTableProps {}

export function ClassesTable({}: ClassesTableProps) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const date = new Date();
    const FETCH_AMMOUNT = 100;

    const [classes, setClasses] = React.useState<Omit<Class, 'prytaneumURL'>[]>([]);
    const [isLoadingNext, setIsLoadingNext] = React.useState<boolean>(false);
    const [hasNext, setHasNext] = React.useState<boolean>(false);
    const [filter, setFilter] = React.useState<ClassesTableSearchFilter>({ termId: '', name: '' });

    React.useEffect(() => {
        getAllClasses(FETCH_AMMOUNT).then(({ classes, hasNextPage }) => {
            setClasses(classes);
            setHasNext(hasNextPage);
        });
    }, []);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = React.useMemo(
        () => (page > 0 ? Math.max(0, (1 + page) * rowsPerPage - classes.length) : 0),
        [page, rowsPerPage, classes.length]
    );

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchFilter = (filter: ClassesTableSearchFilter) => {
        setFilter(filter);
        refreshClasses(FETCH_AMMOUNT, filter).then(({ classes, hasNextPage }) => {
            setClasses(classes);
            setHasNext(hasNextPage);
        });
    };

    const handleLoadNext = React.useCallback(() => {
        if (hasNext && !isLoadingNext) {
            setIsLoadingNext(true);
            loadNextPageClasses(FETCH_AMMOUNT, page, filter).then(({ classes, hasNextPage }) => {
                setClasses(classes);
                setHasNext(hasNextPage);
                setIsLoadingNext(false);
            });
        }
    }, [filter, hasNext, isLoadingNext, page]);

    const usersListLength = React.useMemo(() => classes.length, [classes]);
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
                    Classes Table
                </Typography>
            </Grid>
            <SearchBar handleSearchFilter={handleSearchFilter} />
            <TableContainer style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
                <Table sx={{ minWidth: 650 }} aria-label='dashboard-table'>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: 250 }}>
                                <Typography fontWeight='bold'>Term ID</Typography>
                            </TableCell>
                            <TableCell style={{ width: 250 }}>
                                <Typography fontWeight='bold'>Name</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? classes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : classes
                        ).map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Typography>{user.termId}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>{user.name}</Typography>
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
        </React.Fragment>
    );
}
