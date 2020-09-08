/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { useReducer, useCallback, useState, useEffect } from 'react';
import { Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { UserInfo } from 'domains/AdminDashboard/types';

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
    const [loading, setLoading] = useState<boolean>(false);

    const filteredUsersHandler = useCallback(
        (filteredUsers: Array<UserInfo>) => {
            dispatch({ type: 'SET', users: filteredUsers });
        },
        []
    );

    const promoteUserHandler = useCallback((id: string, status: string) => {
        dispatch({ type: 'PROMOTE', status, id });
    }, []);

    console.log('LOADING: ', loading);

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
                            rowTraits={users.map((user) => {
                                return { ...user, primary: user.name };
                            })}
                            loading={loading}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default UserList;
