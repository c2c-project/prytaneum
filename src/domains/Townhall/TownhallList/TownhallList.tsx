import React from 'react';
import {
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Fade,
    ListItemSecondaryAction,
    Paper,
} from '@material-ui/core';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { makeStyles } from '@material-ui/core/styles';
import type { Townhall } from 'prytaneum-typings';

import { formatDate } from 'utils/format';
import useEndpoint from 'hooks/useEndpoint';
import Loader from 'components/Loader';
import ListFilter from 'components/ListFilter';
import { getTownhallList } from '../api';
import {
    filters as filterFuncs,
    TonwhallFilterFunc,
    search,
    applyFilters,
} from './utils';

const useStyles = makeStyles((theme) => ({
    title: {
        padding: theme.spacing(3, 0, 2, 2),
    },
    listFilter: {
        padding: theme.spacing(0, 2),
    },
    paper: {
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            borderRadius: 0,
        },
        [theme.breakpoints.up('md')]: {
            margin: theme.spacing(3, 0),
        },
        boxShadow: theme.shadows[10],
        paddingBottom: theme.spacing(3),
    },
}));

interface Props {
    onClickTownhall: (id: string) => void;
}

export default function TownhallList({ onClickTownhall }: Props) {
    const classes = useStyles();
    const [list, setList] = React.useState<Townhall[] | null>(null);

    // search is always the first element in the filter array
    const [filters, setFilters] = React.useState<TonwhallFilterFunc[]>([
        (townhalls: Townhall[]) => townhalls,
    ]);
    const [sendRequest, isLoading] = useEndpoint(() => getTownhallList(), {
        onSuccess: (results) => {
            setList(results.data);
        },
    });
    const filteredResults = React.useMemo(
        () => applyFilters(list || [], filters),
        [list, filters]
    );

    React.useEffect(sendRequest, []);

    const handleSearch = React.useCallback(
        (text: string) =>
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            setFilters(([_prevSearch, ...otherFilters]) => [
                (filteredList) => search(text, filteredList),
                ...otherFilters,
            ]),
        []
    );

    if (isLoading || !list) return <Loader />;

    if (list.length === 0) {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <Typography variant='h4'>No Townhalls to display</Typography>
            </div>
        );
    }

    return (
        <Fade in timeout={400}>
            <Paper className={classes.paper}>
                <Typography className={classes.title} variant='h4'>
                    Townhalls
                </Typography>
                <div className={classes.listFilter}>
                    <ListFilter
                        filterMap={filterFuncs}
                        onSearch={handleSearch}
                        onFilterChange={(newFilters) =>
                            setFilters(([searchFunc]) => [
                                searchFunc,
                                ...newFilters,
                            ])
                        }
                        length={filteredResults.length}
                    />
                </div>
                <List>
                    {filteredResults.map(({ form, _id }) => (
                        <ListItem
                            key={_id}
                            divider
                            button
                            alignItems='flex-start'
                            onClick={() => onClickTownhall(_id)}
                        >
                            <ListItemAvatar>
                                <Avatar
                                    alt='Speaker'
                                    src='' // FIXME:
                                >
                                    {form.title[0]}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={form.title}
                                secondary={formatDate(form.date)}
                            />
                            <ListItemSecondaryAction>
                                <ChevronRight />
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Fade>
    );
}
