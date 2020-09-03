/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { useReducer, useCallback } from 'react';
import { Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ListOverflow from 'components/ListOverflow';
import AdminToolbar from './AdminToolbar';
import { UserInfo } from '../types';

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

type State = UserInfo[];
interface SetAction {
    type: 'SET';
    users: UserInfo[];
}

interface PromoteAction {
    type: 'PROMOTE';
    status: string;
    id: string;
}

type Action = SetAction | PromoteAction;

function reducer(users: State, action: Action): State {
    switch (action.type) {
        case 'SET':
            return action.users;
        case 'PROMOTE': {
            const copy: UserInfo[] = [...users];
            const userIndex = copy.findIndex((user) => user.id === action.id);
            const newUserInfo = {
                ...copy[userIndex],
                status: action.status,
            };

            copy[userIndex] = newUserInfo;

            return copy;
        }
        default:
            throw new Error('Should not get there!');
    }
}

const UserList = () => {
    const classes = useStyles();
    const [users, dispatch] = useReducer(reducer, []);

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
