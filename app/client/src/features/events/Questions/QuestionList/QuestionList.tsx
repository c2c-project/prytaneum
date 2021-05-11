/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { IconButton, Grid, Badge, Tooltip } from '@material-ui/core';
import { Pause, PlayArrow } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { EventQuestion } from '@local/graphql-types';
import ListFilter, { useFilters, Accessors, ListFilterSkeleton } from '@local/components/ListFilter';

import { QuestionCardSkeleton } from '../QuestionCard';
import FeedList from './FeedList';
import { EmptyMessage, RefreshMessage } from './components';
// import { filters as filterFuncs } from './utils';
import { useQuestionList } from './useQuestionList';

interface Props {
    className?: string;
    style?: React.CSSProperties;
}

const useStyles = makeStyles(() => ({
    root: {
        // padding: theme.spacing(1.5),
    },
    listFilter: {
        flex: 1,
    },
    content: {
        height: 0, // flex box recalculates this -- explanation:  https://stackoverflow.com/a/14964944
        flex: '1 1 100%',
    },
}));

export function QuestionFeedLoading() {
    return (
        <>
            <ListFilterSkeleton />
            {new Array(3).fill(0).map((_zero, idx) => (
                <QuestionCardSkeleton key={idx} />
            ))}
        </>
    );
}

export function QuestionList({ className, style }: Props) {
    const classes = useStyles();
    const { isLoading, isPaused, buffer, questionList, dispatch, isModerator } = useQuestionList();

    function togglePause() {
        dispatch({ type: 'togglePause' });
    }

    const accessors = React.useMemo<Accessors<EventQuestion>[]>(
        () => [
            (q) => q?.question || '', // question text itself
            (q) => q?.createdBy?.firstName || '', // first name of the user
        ],
        []
    );
    const [filteredList, handleSearch, handleFilterChange] = useFilters(questionList, accessors);

    return (
        <Grid alignContent='flex-start' container className={clsx(classes.root, className)} style={style}>
            {isLoading ? (
                <QuestionFeedLoading />
            ) : (
                <>
                    <ListFilter
                        className={classes.listFilter}
                        // filterMap={filterFuncs}
                        onFilterChange={handleFilterChange}
                        onSearch={handleSearch}
                        length={filteredList.length}
                        menuIcons={[
                            <Tooltip title='Load New'>
                                <span>
                                    <IconButton color='inherit' onClick={togglePause}>
                                        <Badge badgeContent={isPaused ? buffer.length : 0} color='secondary'>
                                            {isPaused ? <PlayArrow /> : <Pause />}
                                        </Badge>
                                    </IconButton>
                                </span>
                            </Tooltip>,
                        ]}
                    />
                    <FeedList
                        className={classes.content}
                        variant={isModerator ? 'moderator' : 'user'}
                        questions={filteredList}
                        systemMessages={[]}
                    />
                </>
            )}
        </Grid>
    );
}

QuestionList.defaultProps = {
    className: undefined,
    style: undefined,
};
