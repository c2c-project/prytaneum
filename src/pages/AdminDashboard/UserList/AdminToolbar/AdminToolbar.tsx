import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Grid, Popper, Paper } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

import CheckBox from '../../../../components/CheckBox';
import SearchToolbar from '../../../../components/SearchToolbar';

import { mockData, statusTags } from '../../data';

const useStyles = makeStyles((theme) => ({
    root: {},
    filterPopper: {
        maxWidth: '300px',
        marginRight: theme.spacing(1),
    },
}));

type userInfo = {
    id: number;
    name: string;
    status: string;
    timeStamp: number;
};

export interface Props {
    onLoadUsers: (setHandler: Array<userInfo>) => void;
    filterLabel?: string;
}

const AdminToolbar = ({ onLoadUsers, filterLabel }: Props) => {
    const classes = useStyles();
    const [filterAnchorEl, setFilterAnchorEl] = useState(null);
    const open = Boolean(filterAnchorEl);
    const [enteredFilter, setEnteredFilter] = useState<string>('');
    const [enteredFilterTags, setEnteredFilterTags] = useState<Array<string>>(
        []
    );

    const inputRef = useRef();

    const filterClickHandler = (event: React.MouseEvent) => {
        open ? setFilterAnchorEl(null) : setFilterAnchorEl(event.currentTarget);
    };

    useEffect(() => {
        //* API FETCH SHOULD GO HERE
        const timer = setTimeout(() => {
            // if (enteredFilter === inputRef.current.value) {
            let loadedUsers = mockData;

            if (enteredFilter.length > 0) {
                loadedUsers = mockData.filter((user) =>
                    user.name
                        .toLowerCase()
                        .includes(enteredFilter.toLowerCase())
                );
            }

            if (enteredFilterTags.length > 0) {
                loadedUsers = loadedUsers.filter((user) =>
                    enteredFilterTags.includes(user.status)
                );
            }
            onLoadUsers(loadedUsers);
            // }
        }, 500);
        return () => {
            clearTimeout(timer);
        };
    }, [enteredFilter, enteredFilterTags, onLoadUsers, inputRef]);

    return (
        <div>
            <Grid container alignItems='center'>
                <Grid item xs={11}>
                    <SearchToolbar
                        // placeholder='Search User'
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
                        <Paper className={classes.filterPopper}>
                            <CheckBox
                                options={statusTags}
                                selectedFilter={enteredFilterTags}
                                onChange={(
                                    event: React.ChangeEvent<{}>,
                                    value: React.SetStateAction<Array<string>>,
                                    reason: any
                                ) => setEnteredFilterTags(value)}
                            />
                        </Paper>
                    </Popper>
                </Grid>
            </Grid>
        </div>
    );
};

AdminToolbar.defaultProps = {
    filterLabel: 'filter',
};

AdminToolbar.propTypes = {
    onLoadUsers: PropTypes.func.isRequired,
    filterLabel: PropTypes.string,
};

export default AdminToolbar;
