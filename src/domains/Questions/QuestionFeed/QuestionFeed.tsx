/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { IconButton, Grid, Badge, Tooltip } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import type { Question } from 'prytaneum-typings';

import ListFilter, { useFilters, Accessors, ListFilterSkeleton } from 'components/ListFilter';
import useTownhall from 'hooks/useTownhall';

import { QuestionCardSkeleton } from '../QuestionCard';
import FeedList from './FeedList';
import { EmptyMessage, RefreshMessage } from './components';
// import { filters as filterFuncs } from './utils';
import useQuestionFeed from './useQuestionFeed';

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

function QuestionFeed({ className, style }: Props) {
    const classes = useStyles();
    const [townhall, isModerator] = useTownhall();
    const [sysMessages, setSysMessages] = React.useState<React.ReactNodeArray>([]);
    const [questions, buffer, flush, isLoading] = useQuestionFeed(townhall._id);
    const accessors = React.useMemo<Accessors<Question>[]>(
        () => [
            (q) => q.question, // question text itself
            (q) => q.meta.createdBy.name.first, // first name of the user
        ],
        []
    );
    const [filteredList, handleSearch, handleFilterChange] = useFilters(questions, accessors);

    // React.useEffect(() => {
    //     if (buffer.length && onDataChange) onDataChange(buffer.length);
    // }, [buffer.length, onDataChange]);

    React.useEffect(() => {
        if (questions.length === 0) {
            setSysMessages([<EmptyMessage />]);
            if (buffer.length > 0) {
                setSysMessages((prev) => [<RefreshMessage />, ...prev]);
            }
        }
    }, [buffer.length, questions.length]);
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
                                    <IconButton onClick={flush} color='inherit' disabled={buffer.length === 0}>
                                        <Badge badgeContent={buffer.length} color='secondary'>
                                            <RefreshIcon />
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
                        systemMessages={sysMessages}
                    />
                </>
            )}
        </Grid>
    );
}

QuestionFeed.defaultProps = {
    className: undefined,
    style: undefined,
};

export default QuestionFeed;
