import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useEndpoint from 'hooks/useEndpoint';
import { getUser } from 'domains/AdminDashboard/api/api';

import { Grid, Paper, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import * as AdminDashboardTypes from 'domains/AdminDashboard/types';
import { userProfileFormat } from 'domains/AdminDashboard/helper/helper';

import Fab from 'components/Fab';
import Loader from 'components/Loader';
import UserInfo from './UserInfo';
import UserTags from './UserTags';
import UserActionHistory from './UserActionHistory';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
    },
    paper: {
        padding: theme.spacing(1),
        borderRadius: '0px',
        height: '100%',
    },
    list: {
        width: '100%',
        height: '100%',
    },
}));

export interface Props {
    fabMenuItems: Array<string>;
    userId: string;
}

const UserProfile = ({ fabMenuItems, userId }: Props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const open = Boolean(anchorEl);
    const [
        user,
        setUser,
    ] = useState<AdminDashboardTypes.UserProfileFormat | null>(null);
    const [get] = useEndpoint(() => getUser(userId), {
        onSuccess: (res) => {
            const { user: fetchedUser } = res.data;
            setUser(userProfileFormat(fetchedUser));
        },
    });

    const handleFabClose = () => {
        setAnchorEl(null);
    };

    const handleFabClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        const { currentTarget } = event;
        setAnchorEl(currentTarget);
    };

    const itemList = fabMenuItems.map((item) => {
        return (
            <MenuItem key={item} data-my-value={item} onClick={handleFabClose}>
                {item}
            </MenuItem>
        );
    });

    useEffect(() => {
        if (!user) {
            get();
        }
    }, []);

    if (!user) {
        return <Loader />;
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid
                    container
                    direction='column'
                    justify='flex-start'
                    spacing={2}
                >
                    <Grid item xs={12}>
                        <UserInfo profileInfo={user.profileInfo} />
                    </Grid>
                    <Grid item xs={12}>
                        <UserTags
                            tags={user.tags}
                            primaryHeader='User Tags'
                            emptyMessage='No Tags'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <UserActionHistory
                            ListsTraits={user.actionHistoryData}
                        />
                    </Grid>
                </Grid>
                <Fab
                    aria-controls='profileOptions'
                    aria-label='profileOptions'
                    aria-haspopup='true'
                    onClick={handleFabClick}
                >
                    <MoreVertIcon />
                </Fab>
                <Menu
                    id='profileOptions'
                    keepMounted
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleFabClose}
                >
                    {itemList}
                </Menu>
            </Paper>
        </div>
    );
};

UserProfile.defaultProps = {
    fabMenuItems: ['PROMOTE', 'EDIT', 'ADD'],
};

UserProfile.propTypes = {
    fabMenuItems: PropTypes.arrayOf(PropTypes.string),
};

export default UserProfile;
