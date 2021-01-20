import React from 'react';
import {
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    ListItemSecondaryAction,
    Card,
    CardContent,
    CardHeader,
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
    root: {
        width: '100%',
        height: '100%',
        padding: theme.spacing(0, 0, 2, 0),
    },
    card: {
        width: '100%',
        paddingBottom: theme.spacing(3),
    },
    title: {
        paddingBottom: 0,
        marginBottom: 0,
    },
}));

interface Props {
    onClickTownhall: (id: string) => void;
    title?: string;
}

export default function TownhallList({ onClickTownhall, title }: Props) {
    const classes = useStyles();
    const [list, setList] = React.useState<Townhall[] | null>(null);

    // search is always the first element in the filter array
    const [filters, setFilters] = React.useState<TonwhallFilterFunc[]>([
        (townhalls: Townhall[]) => townhalls,
    ]);
    const [, isLoading] = useEndpoint(() => getTownhallList(), {
        onSuccess: (results) => {
            setList(results.data);
        },
        runOnFirstRender: true,
    });
    const filteredResults = React.useMemo(
        () => applyFilters(list || [], filters),
        [list, filters]
    );

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
        <div className={classes.root}>
            <Card raised className={classes.card}>
                {title && (
                    <CardHeader title={title} className={classes.title} />
                )}
                <CardContent>
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
                </CardContent>
            </Card>
        </div>
    );
}

TownhallList.defaultProps = {
    title: '',
};
