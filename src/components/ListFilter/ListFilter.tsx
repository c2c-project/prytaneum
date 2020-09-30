import React from 'react';
import {
    IconButton,
    Grid,
    Menu,
    MenuItem,
    ListItemText,
    Grow,
    InputAdornment,
    Badge,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FilterIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import Done from '@material-ui/icons/DoneSharp';

import TextField from 'components/TextField';

interface Props {
    filterOptions: string[];
    onFilter: (f: Set<string>) => void;
    onSearch: (s: string) => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: `${theme.spacing(2)}px ${theme.spacing(1)}px 0 ${theme.spacing(
            1
        )}px`,
    },
}));

type Filters = Set<string>;
type Op = (s: Filters) => void;

export default function ListFilter({
    filterOptions,
    onFilter,
    onSearch,
}: Props) {
    const classes = useStyles();
    const [filters, setFilters] = React.useState<Filters>(new Set());
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [search, setSearch] = React.useState('');

    const immutableTransform = (op: Op) => (prevFilters: Filters) => {
        const copy = new Set(prevFilters);
        op(copy);
        onFilter(copy);
        return copy;
    };

    const toggleFilter = (filter: string) => {
        if (filters.has(filter)) {
            setFilters(immutableTransform((set) => set.delete(filter)));
        } else {
            setFilters(immutableTransform((set) => set.add(filter)));
        }
    };

    return (
        <div className={classes.root}>
            <Grid container justify='space-around'>
                <Grid item xs={10}>
                    <TextField
                        variant='filled'
                        label='Search'
                        fullWidth
                        value={search}
                        onChange={(e) => {
                            e.preventDefault();
                            const copy = e.target.value;
                            setSearch(copy);
                            onSearch(copy);
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item container justify='flex-end' xs={2}>
                    <IconButton
                        color='inherit'
                        onClick={({ currentTarget }) =>
                            setAnchorEl(currentTarget)
                        }
                    >
                        <Badge badgeContent={filters.size} color='secondary'>
                            <FilterIcon />
                        </Badge>
                    </IconButton>
                </Grid>
            </Grid>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                {filterOptions.map((option) => (
                    <MenuItem
                        key={option}
                        button
                        onClick={() => toggleFilter(option)}
                    >
                        <Grow in={filters.has(option)}>
                            <Done color='primary' />
                        </Grow>
                        <ListItemText primary={option} />
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
