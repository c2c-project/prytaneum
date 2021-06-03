/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { IconButton, Grid, Badge, Tooltip } from '@material-ui/core';
import { Pause, PlayArrow } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import type { useQuestionListFragment$key } from '@local/__generated__/useQuestionListFragment.graphql';
import { EventQuestion } from '@local/graphql-types';
import ListFilter, { useFilters, Accessors, ListFilterSkeleton } from '@local/components/ListFilter';
import { ArrayElement } from '@local/utils/ts-utils';

import { QuestionCardSkeleton } from '../QuestionCard';
import FeedList from './FeedList';
import { EmptyMessage, RefreshMessage } from './components';
// import { filters as filterFuncs } from './utils';
import { useQuestionList } from './useQuestionList';

interface Props {
    className?: string;
    style?: React.CSSProperties;
    fragmentRef: useQuestionListFragment$key;
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

export function QuestionList({ className, style, fragmentRef }: Props) {
    const classes = useStyles();
    const [state, setState] = React.useState(false); // FIXME:
    const { questions, eventId } = useQuestionList({ fragmentRef });

    function togglePause() {}

    const accessors = React.useMemo<Accessors<ArrayElement<typeof questions>>[]>(
        () => [
            (q) => q?.question || '', // question text itself
            (q) => q?.createdBy?.firstName || '', // first name of the user
        ],
        []
    );
    const [filteredList, handleSearch, handleFilterChange] = useFilters(questions, accessors);
    return (
        <Grid alignContent='flex-start' container className={clsx(classes.root, className)} style={style}>
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
                                <Badge badgeContent={state ? 0 : 0} color='secondary'>
                                    {state ? <PlayArrow /> : <Pause />}
                                </Badge>
                            </IconButton>
                        </span>
                    </Tooltip>,
                ]}
            />
            <FeedList
                className={classes.content}
                variant={state ? 'moderator' : 'user'}
                questions={filteredList}
                systemMessages={[]}
                eventId={eventId}
            />
        </Grid>
    );
}

QuestionList.defaultProps = {
    className: undefined,
    style: undefined,
};
