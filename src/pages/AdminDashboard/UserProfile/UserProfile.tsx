import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MoreVertIcon from '@material-ui/icons/MoreVert';

import Fab from 'components/Fab';
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
    profileInfo: {
        primary: string;
        info: Array<{
            status: string;
            count: number;
        }>;
    };
    tags: Array<string>;
    userActionHistory: Array<{
        id: string | number;
        primary: string;
        secondary: string;
    }>;
    fabMenuItems: Array<string>;
}

const UserProfile = ({
    profileInfo,
    tags,
    userActionHistory,
    fabMenuItems,
}: Props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const open = Boolean(anchorEl);

    const handleFabClose = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
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
                        <UserInfo profileInfo={profileInfo} />
                    </Grid>
                    <Grid item xs={12}>
                        <UserTags tags={tags} />
                    </Grid>
                    <Grid item xs={12}>
                        <UserActionHistory ListsTraits={userActionHistory} />
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

UserProfile.propTypes = {
    profileInfo: PropTypes.shape({
        primary: PropTypes.string.isRequired,
        info: PropTypes.arrayOf(
            PropTypes.shape({
                status: PropTypes.string.isRequired,
                count: PropTypes.number.isRequired,
            }).isRequired
        ),
    }).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    userActionHistory: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
            primary: PropTypes.string,
            secondary: PropTypes.string,
        })
    ).isRequired,
};

export default UserProfile;
