import React, { useState } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import type { User } from 'prytaneum-typings';

import ListFilter from 'components/ListFilter';
import ListOverflow from 'components/ListOverflow';
import { search as utilSearch, FilterFunc, applyFilters } from 'utils/filters';
import useEndpoint from 'hooks/useEndpoint';
import API from 'domains/Admin/api';
import Loader from 'components/Loader';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2, 0),
        boxShadow: theme.shadows[10],
        margin: theme.spacing(2, 0),
    },
    toolbar: {
        padding: theme.spacing(0, 2),
    },
    title: {
        marginLeft: theme.spacing(2),
    },
}));

type UserFilter = FilterFunc<User>;

const search = (searchText: string, data: User[]) => {
    const emailAccessor = (u: User) => u.email.address;
    return utilSearch(searchText, data, [emailAccessor]);
};

const filterMap: Record<string, UserFilter> = {
    Admin: (list) => list.filter(({ roles }) => roles.includes('admin')),
    Organizer: (list) =>
        list.filter(({ roles }) => roles.includes('organizer')),
};

const UserList = () => {
    const classes = useStyles();
    const [users, setUsers] = useState<User[]>([]);
    const [filters, setFilters] = useState<UserFilter[]>([(u: User[]) => u]);
    const [sendRequest, isLoading] = useEndpoint(API.getUserList, {
        onSuccess: ({ data }) => {
            setUsers(data.list);
        },
    });

    const filteredUsers = React.useMemo(() => applyFilters(users, filters), [
        filters,
        users,
    ]);
    const handleFilterChange = (newFilters: UserFilter[]) =>
        setFilters(([searchFilter]) => [searchFilter, ...newFilters]);

    const handleSearch = React.useCallback(
        (searchText: string) =>
            setFilters(([, ...otherFilters]) => [
                (filteredList) => search(searchText, filteredList),
                ...otherFilters,
            ]),
        [setFilters]
    );

    React.useEffect(sendRequest, []);

    if (isLoading) return <Loader />;
    if (users.length === 0) return <div>Null</div>;

    return (
        <Paper className={classes.paper}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant='h4' className={classes.title}>
                        User List
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.toolbar}>
                    <ListFilter
                        onSearch={handleSearch}
                        onFilterChange={handleFilterChange}
                        filterMap={filterMap}
                        length={filteredUsers.length}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ListOverflow
                        rowProps={filteredUsers.map((user) => {
                            return {
                                _id: user._id,
                                primary: user.email.address,
                                secondary: '',
                            };
                        })}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default UserList;
