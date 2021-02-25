import React from 'react';
import {
    IconButton,
    Grid,
    Menu,
    MenuItem,
    ListItemText,
    InputAdornment,
    Badge,
    Checkbox,
    Typography,
    Tooltip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FilterIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import { Skeleton, SkeletonProps } from '@material-ui/lab';
import clsx from 'clsx';

import TextField from 'components/TextField';
import { FilterFunc } from 'utils/filters';

export interface Props<T> {
    onSearch: (s: string) => void;
    length: number;
    filterMap?: {
        [index: string]: (t: T[]) => T[];
    };
    onFilterChange: (f: FilterFunc<T>[]) => void;
    className?: string;
    menuIcons?: JSX.Element[];
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2, 0, 0, 0),
    },
    resultsText: {
        padding: theme.spacing(1, 0),
    },
    search: {
        flex: 1,
    },
    iconContainer: {
        flexBasis: 'auto',
        width: 'auto',
        marginLeft: theme.spacing(0.5),
    },
}));

type Filters = Set<string>;
type Op = (s: Filters) => void;

export function ListFilterSkeleton(props: SkeletonProps) {
    return (
        <Skeleton variant='rect' style={{ margin: '8px 0', marginBottom: 12 }} width='100%' height={56} {...props} />
    );
}

export default function ListFilter<T>({ filterMap, onSearch, length, onFilterChange, menuIcons, className }: Props<T>) {
    const classes = useStyles();
    const [filters, setFilters] = React.useState<Filters>(new Set());
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [search, setSearch] = React.useState('');
    const prevSearch = React.useRef('');

    const immutableTransform = (op: Op) => (prevFilters: Filters) => {
        const copy = new Set(prevFilters);
        op(copy);
        if (filterMap) {
            const filterFuncs = Array.from(copy).map((filterKey) => filterMap[filterKey]);
            onFilterChange(filterFuncs);
        }
        return copy;
    };

    const toggleFilter = (filter: string) => {
        if (filters.has(filter)) {
            setFilters(immutableTransform((set) => set.delete(filter)));
        } else {
            setFilters(immutableTransform((set) => set.add(filter)));
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const copy = e.target.value;
        setSearch(copy);
    };

    React.useEffect(() => {
        // TODO: replace with a useThrottle hook in the future
        const cache = search.slice(0);
        const handle = setTimeout(() => {
            if (search === cache && search !== prevSearch.current) {
                prevSearch.current = search;
                onSearch(search);
            }
        }, 300);
        return () => {
            clearTimeout(handle);
        };
    }, [search, onSearch]);

    const clearSearch = () => setSearch('');

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') clearSearch();
    };

    return (
        <div className={className ? clsx([classes.root, className]) : classes.root}>
            <Grid container alignItems='center'>
                <Grid item xs='auto' className={classes.search}>
                    <TextField
                        label='Search'
                        value={search}
                        onChange={handleSearch}
                        onKeyDown={handleKeyPress}
                        InputProps={{
                            // TODO: animation change here
                            endAdornment:
                                search === '' ? (
                                    <InputAdornment position='end'>
                                        <SearchIcon />
                                    </InputAdornment>
                                ) : (
                                    <InputAdornment position='end'>
                                        <IconButton edge='end' onClick={clearSearch}>
                                            <CloseIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                        }}
                    />
                </Grid>
                <Grid
                    item
                    container
                    justify='space-evenly'
                    xs='auto'
                    alignItems='center'
                    className={classes.iconContainer}
                >
                    {filterMap && (
                        <Grid item xs='auto'>
                            <Tooltip title='Filter'>
                                <IconButton color='inherit' onClick={({ currentTarget }) => setAnchorEl(currentTarget)}>
                                    <Badge badgeContent={filters.size} color='secondary'>
                                        <FilterIcon />
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    )}
                    {menuIcons?.map((icon, idx) => (
                        <Grid key={idx} item xs='auto'>
                            {icon}
                        </Grid>
                    ))}
                </Grid>
                <Grid item xs={12} className={classes.resultsText}>
                    <Typography variant='body2' color='textSecondary'>
                        {`${length} Results Displayed`}
                    </Typography>
                </Grid>
            </Grid>
            {filterMap && (
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                    {Object.keys(filterMap).map((option) => (
                        <MenuItem key={option} button onClick={() => toggleFilter(option)}>
                            <Checkbox checked={filters.has(option)} />
                            <ListItemText primary={option} />
                        </MenuItem>
                    ))}
                </Menu>
            )}
        </div>
    );
}

ListFilter.defaultProps = {
    menuIcons: [],
    className: undefined,
    filterMap: undefined,
};
