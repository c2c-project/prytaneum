import React from 'react';
import { IconButton, Grid, Badge, Collapse } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import { makeStyles } from '@material-ui/core/styles';

import useSocketio from 'hooks/useSocketio';
import ListFilter from 'components/ListFilter';
import Dialog from 'components/Dialog';
import { Question as QuestionType } from '../types';
import {
    search,
    applyFilters,
    filters as filterFuncs,
    questionReducer,
    Actions,
    handleUserAction,
    QuestionFilterFunc,
} from './utils';
import { CurrentQuestion, Question, UserBar } from './components';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        height: '100%',
    },
}));

export default function QuestionFeed() {
    const classes = useStyles();

    // full question feed from socketio
    const [questions] = useSocketio<QuestionType[], Actions>({
        url: '/moderator/questions', // FIXME: update the url
        event: 'townhall-question-state',
        reducer: questionReducer,
        initialState: [],
    });

    // displayed questions, which differs from the full feed
    const [displayed, setDisplayed] = React.useState<QuestionType[]>([]);

    // difference between displayed count and full question feed count
    const [difference, setDifference] = React.useState(0);

    // the first filter will always be the "search" filter, which initially just returns the full question list
    const [filters, setFilters] = React.useState([(q: QuestionType[]) => q]);

    // list of questions with all filters applied
    const filteredList = React.useMemo(() => applyFilters(displayed, filters), [
        displayed,
        filters,
    ]);

    // there should never be more than 1 current question, so we can stop at the first one found
    const currentQuestion = React.useMemo(
        () => displayed.find((q) => q.state === 'CURRENT'),
        [displayed]
    );

    // updating difference when one of the boundaries change
    React.useEffect(() => {
        setDifference(questions.length - displayed.length);
    }, [questions.length, displayed.length]);

    // onClick refresh button
    function handleRefresh() {
        setDisplayed(questions);
    }

    function handleFilterChange(newFilters: QuestionFilterFunc[]) {
        // replace everything BUT the first index
        const updateFilters = ([prevSearch]: QuestionFilterFunc[]) => [
            prevSearch,
            ...newFilters,
        ];
        setFilters(updateFilters);
    }

    function handleSearch(searchText: string) {
        // replace ONLY the search filter -- the first index
        const updateSearch = (filtersWithOldSearch: QuestionFilterFunc[]) => {
            const [, ...currentFilters] = filtersWithOldSearch;
            const newSearch: QuestionFilterFunc = (data) =>
                search(searchText, data);
            return [newSearch, ...currentFilters];
        };
        setFilters(updateSearch);
    }

    return (
        <div className={classes.root}>
            <ListFilter
                filterMap={filterFuncs}
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
                length={filteredList.length}
                menuIcons={[
                    <IconButton
                        onClick={handleRefresh}
                        color='inherit'
                        disabled={difference === 0}
                    >
                        <Badge badgeContent={difference} color='secondary'>
                            <RefreshIcon />
                        </Badge>
                    </IconButton>,
                ]}
            />
            <Grid container>
                <Grid container item xs={12} justify='center'>
                    <Collapse
                        key={currentQuestion?._id}
                        in={Boolean(currentQuestion)}
                    >
                        {currentQuestion && (
                            <CurrentQuestion>
                                <Question
                                    user={currentQuestion.meta.user.name}
                                    timestamp={currentQuestion.meta.timestamp}
                                    actionBar={<div />}
                                >
                                    {currentQuestion.question}
                                </Question>
                            </CurrentQuestion>
                        )}
                    </Collapse>
                    {filteredList.map(({ question, _id, meta }) => (
                        <Question
                            key={_id}
                            user={meta.user.name}
                            timestamp={meta.timestamp}
                            divider
                            actionBar={
                                <UserBar
                                    onClick={(action) =>
                                        handleUserAction({
                                            type: action,
                                            payload: _id,
                                        })
                                    }
                                />
                            }
                        >
                            {question}
                        </Question>
                    ))}
                </Grid>
            </Grid>
        </div>
    );
}
