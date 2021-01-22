import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import type { User } from 'prytaneum-typings';

import ListFilter, { Accessors, useFilters } from 'components/ListFilter';
import ListOverflow from 'components/ListOverflow';
import { FilterFunc } from 'utils/filters';
import useEndpoint from 'hooks/useEndpoint';
import API from 'domains/Admin/api';
import Loader from 'components/Loader';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
    },
    card: {
        padding: theme.spacing(2, 0),
    },
    toolbar: {
        padding: theme.spacing(0, 2),
    },
    title: {
        marginLeft: theme.spacing(2),
    },
}));

type UserFilter = FilterFunc<User>;

const filterMap: Record<string, UserFilter> = {
    Admin: (list) => list.filter(({ roles }) => roles.includes('admin')),
    Organizer: (list) => list.filter(({ roles }) => roles.includes('organizer')),
};

const UserList = () => {
    const classes = useStyles();
    const [users, setUsers] = useState<User[]>([]);
    const accessors = React.useMemo<Accessors<User>[]>(
        () => [
            (u) => u.email.address, // user's email address
        ],
        []
    );
    const [filteredResults, handleSearch, handleFilterChange] = useFilters(users, accessors);

    const [, isLoading] = useEndpoint(API.getUserList, {
        onSuccess: ({ data }) => {
            setUsers(data.list);
        },
        runOnFirstRender: true,
    });

    if (isLoading) return <Loader />;
    if (users.length === 0) return <div>Null</div>;

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardHeader title='User List' titleTypographyProps={{ className: classes.title }} />
                <CardContent>
                    <Grid item xs={12} className={classes.toolbar}>
                        <ListFilter
                            onSearch={handleSearch}
                            onFilterChange={handleFilterChange}
                            filterMap={filterMap}
                            length={filteredResults.length}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ListOverflow
                            rowProps={filteredResults.map((user) => {
                                return {
                                    _id: user._id,
                                    primary: user.email.address,
                                    secondary: '',
                                };
                            })}
                        />
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
};

export default UserList;
