/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { useCallback, useState } from 'react';
import { Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { UserProfile } from 'domains/AdminDashboard/types';

import ListOverflow from 'components/ListOverflow';
import AdminToolbar from './AdminToolbar';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
    },
    paper: {
        paddingBottom: theme.spacing(1),
        height: '100%',
        textAlign: 'center',
        borderRadius: '0px',
    },
}));

const UserList = () => {
    const classes = useStyles();
    const [users, setUsers] = useState<UserProfile[]>([]);
    // FIXME:
    // eslint-disable-next-line
    const [loading, setLoading] = useState<boolean>(false);

    const filteredUsersHandler = useCallback((filteredUsers: UserProfile[]) => {
        setUsers(filteredUsers);
    }, []);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container direction='column' justify='space-around'>
                    <Grid item xs={12}>
                        <AdminToolbar
                            onLoadUsers={filteredUsersHandler}
                            filterLabel='statusFilter'
                            setLoading={setLoading}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ListOverflow
                            rowProps={users.map((user) => {
                                return { ...user, primary: user.name };
                            })}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default UserList;
