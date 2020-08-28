/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { useReducer, useCallback } from 'react';
import { Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AdminToolbar from './AdminToolbar';
import ListOverflow from '../../../components/ListOverflow';

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

type UserInfo = {
    id: number;
    name: string;
    status: string;
    timeStamp: number;
};

interface State {
    users: Array<UserInfo>;
}

interface Action {
    type: string;
    users?: Array<UserInfo>;
    status?: string;
    id?: number | string;
}

function usersReducer(currentUsers: State, action: Action) {
    switch (action.type) {
        case 'SET':
            return action.users;
        case 'PROMOTE':
            const userIndex = currentUsers.findIndex((user) => {
                return user.id === action.id;
            });
            const newUserInfo = {
                ...currentUsers[userIndex],
                status: action.status,
            };
            currentUsers[userIndex] = newUserInfo;
            return currentUsers;
        default:
            throw new Error('Should not get there!');
    }
}

const UserList = () => {
    const classes = useStyles();
    const [users, dispatch] = useReducer(usersReducer, []);

    const filteredUsersHandler = useCallback(
        (filteredUsers: Array<UserInfo>) => {
            dispatch({ type: 'SET', users: filteredUsers });
        },
        []
    );

    // const promoteUserHandler = useCallback((id, status) => {
    //     dispatch({ type: 'PROMOTE', id: id, status: status });
    // }, []);

    const usersList =
        users.length === 0 ? (
            <h1>No Users Avaliable</h1>
        ) : (
            <ListOverflow
                rowTraits={users.map((user) => {
                    return { ...user, primary: user.name };
                })}
            />
        );

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container direction='column' justify='space-around'>
                    <Grid item xs={12}>
                        <AdminToolbar
                            onLoadUsers={filteredUsersHandler}
                            filterLabel='statusFilter'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {usersList}
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default UserList;
