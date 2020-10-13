import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
    IconButton,
    Grid,
    Popper,
    Paper,
    ClickAwayListener,
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

import useEndpoint from 'hooks/useEndpoint';
import ComboSelect from 'components/ComboSelect';
import SearchToolbar from 'components/SearchToolbar';
import { UserProfile } from 'domains/AdminDashboard/types';
import API from 'domains/AdminDashboard/api';

const useStyles = makeStyles((theme) => ({
    root: {},
    filterPopper: {
        // maxWidth: '300px',
        width: '500px', // TODO: explore this more later on
        marginRight: theme.spacing(1),
    },
}));

export interface Props {
    onLoadUsers: (setHandler: UserProfile[]) => void;
    filterLabel?: string;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    statusTags: string[];
}

type Anchor = (EventTarget & Element) | null;

const AdminToolbar = ({
    onLoadUsers,
    filterLabel,
    setLoading,
    statusTags,
}: Props) => {
    const classes = useStyles();
    const [filterAnchorEl, setFilterAnchorEl] = useState<Anchor>(null);
    const open = Boolean(filterAnchorEl);
    const [enteredFilter, setEnteredFilter] = useState<string>('');
    const [enteredFilterTags, setEnteredFilterTags] = useState<string[]>([]);
    const [sendRequest, isLoading] = useEndpoint(API.getUserList, {
        onSuccess: (results) => {
            let loadedUsers = results.data.list;
            const copy: UserProfile[] = [...loadedUsers];

            if (enteredFilter.length > 0) {
                loadedUsers = copy.filter((user) =>
                    user.name
                        .toLowerCase()
                        .includes(enteredFilter.toLowerCase())
                );
            }

            if (enteredFilterTags.length > 0) {
                loadedUsers = loadedUsers.filter((usr) => {
                    return usr.status.some((u) => {
                        return enteredFilterTags.includes(u.role) && u.active;
                    });
                });
            }

            onLoadUsers(loadedUsers);
        },
    });

    useEffect(() => {
        sendRequest();
        setLoading(isLoading);
    }, [enteredFilter, enteredFilterTags, onLoadUsers, setLoading]);

    const filterClickHandler = (event: React.MouseEvent) => {
        const { currentTarget } = event;
        if (open) setFilterAnchorEl(null);
        else setFilterAnchorEl(currentTarget);
    };

    return (
        <div>
            <Grid container alignItems='center'>
                <Grid item xs={11}>
                    <SearchToolbar
                        label='Search User'
                        onChange={(event) =>
                            setEnteredFilter(event.target.value)
                        }
                    />
                </Grid>
                <Grid item xs={1}>
                    <IconButton
                        aria-label={filterLabel}
                        onClick={filterClickHandler}
                    >
                        <FilterListIcon />
                    </IconButton>
                    <Popper
                        id={filterLabel}
                        open={open}
                        anchorEl={filterAnchorEl}
                    >
                        <ClickAwayListener
                            onClickAway={() => setFilterAnchorEl(null)}
                        >
                            <Paper className={classes.filterPopper}>
                                <ComboSelect
                                    options={statusTags}
                                    selectedFilter={enteredFilterTags}
                                    onChange={(e, value) =>
                                        setEnteredFilterTags(value)
                                    }
                                    label='Status Tags'
                                />
                            </Paper>
                        </ClickAwayListener>
                    </Popper>
                </Grid>
            </Grid>
        </div>
    );
};

AdminToolbar.defaultProps = {
    filterLabel: 'filter',
    statusTags: ['Admin', 'Organizer', 'Moderator', 'Regular', 'Banned'],
};

AdminToolbar.propTypes = {
    onLoadUsers: PropTypes.func.isRequired,
    filterLabel: PropTypes.string,
    setLoading: PropTypes.func.isRequired,
    statusTags: PropTypes.arrayOf(PropTypes.string),
};

export default AdminToolbar;
