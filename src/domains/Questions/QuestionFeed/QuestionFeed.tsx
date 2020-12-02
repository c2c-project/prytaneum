import React from 'react';
import { IconButton, Grid, Badge, Tooltip } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import { makeStyles } from '@material-ui/core/styles';
import type {
    Question as QuestionType,
    QuestionPayloads,
} from 'prytaneum-typings';

import useSocketio from 'hooks/useSocketio';
import ListFilter from 'components/ListFilter';
import { UserContext } from 'contexts/User';
import { TownhallContext } from 'domains/Townhall/Contexts/Townhall';
import { PaneContext } from 'domains/Townhall/Contexts/Pane';
import { QuestionProps } from '../QuestionFeedItem';

import FeedList from './FeedList';
import { EmptyMessage, RefreshMessage } from './components';
import {
    search,
    applyFilters,
    filters as filterFuncs,
    questionReducer,
    QuestionFilterFunc,
    makeSystemMessage,
} from './utils';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxHeight: '100%',
    },
    item: {
        paddingBottom: theme.spacing(2),
    },
}));

function QuestionFeed() {
    const classes = useStyles();
    const townhall = React.useContext(TownhallContext);
    const user = React.useContext(UserContext);
    const [, dispatch] = React.useContext(PaneContext);

    // full question feed from socketio
    const [questions] = useSocketio<QuestionType[], QuestionPayloads>({
        url: '/questions',
        event: 'question-state',
        reducer: questionReducer,
        initialState: [],
    });

    // displayed questions, which differs from the full feed
    const [displayed, setDisplayed] = React.useState<QuestionType[]>([]);

    // difference between displayed count and full question feed count
    const [difference, setDifference] = React.useState(0);

    // the first filter will always be the "search" filter, which initially just returns the full question list
    const [filters, setFilters] = React.useState([(q: QuestionType[]) => q]);

    const [system, setSystem] = React.useState<QuestionProps[]>(() => [
        makeSystemMessage(<EmptyMessage />),
    ]);

    // list of questions with all filters applied
    const filteredList = React.useMemo(() => applyFilters(displayed, filters), [
        displayed,
        filters,
    ]);

    // there should never be more than 1 current question, so we can stop at the first one found
    const currentQuestion = React.useMemo(
        () => displayed.find((q) => q.state === 'current'),
        [displayed]
    );

    const isModerator = React.useMemo(
        () =>
            user &&
            townhall.settings.moderators.list.find(
                ({ email }) => user.email.address === email
            ),
        [townhall.settings.moderators.list, user]
    );

    // updating difference when one of the boundaries change
    React.useEffect(() => {
        dispatch({
            type: 'Question Feed',
            payload: questions.length - displayed.length,
        });

        setDifference(questions.length - displayed.length);
        if (
            questions.length - displayed.length === questions.length &&
            questions.length > 0 &&
            system.length < 2
            // NOTE: would have to change this in the future
            // if we have more system messages
        ) {
            setSystem((prev) => [
                makeSystemMessage(<RefreshMessage />),
                ...prev,
            ]);
        }
    }, [questions.length, displayed.length, system.length, dispatch]);

    // onClick refresh button
    function handleRefresh() {
        setDisplayed(questions);
    }

    const handleFilterChange = React.useCallback(
        (newFilters: QuestionFilterFunc[]) => {
            // replace everything BUT the first index
            const updateFilters = ([prevSearch]: QuestionFilterFunc[]) => [
                prevSearch,
                ...newFilters,
            ];
            setFilters(updateFilters);
        },
        []
    );

    const handleSearch = React.useCallback((searchText: string) => {
        // replace ONLY the search filter -- the first index
        const updateSearch = (filtersWithOldSearch: QuestionFilterFunc[]) => {
            const [, ...currentFilters] = filtersWithOldSearch;
            const newSearch: QuestionFilterFunc = (data) =>
                search(searchText, data);
            return [newSearch, ...currentFilters];
        };
        setFilters(updateSearch);
    }, []);

    return (
        <div className={classes.root}>
            <ListFilter
                filterMap={filterFuncs}
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
                length={filteredList.length}
                menuIcons={[
                    <Tooltip title='Load New'>
                        <span>
                            <IconButton
                                onClick={handleRefresh}
                                color='inherit'
                                disabled={difference === 0}
                            >
                                <Badge
                                    badgeContent={difference}
                                    color='secondary'
                                >
                                    <RefreshIcon />
                                </Badge>
                            </IconButton>
                        </span>
                    </Tooltip>,
                ]}
            />
            <Grid container justify='center'>
                <FeedList
                    variant={isModerator ? 'moderator' : 'user'}
                    current={currentQuestion}
                    questions={filteredList}
                    systemMessages={system}
                />
            </Grid>
        </div>
    );
}

export default React.memo(QuestionFeed);
