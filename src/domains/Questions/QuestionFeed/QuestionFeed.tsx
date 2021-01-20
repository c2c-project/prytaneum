/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { IconButton, Grid, Badge, Tooltip } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import type { Question } from 'prytaneum-typings';

import ListFilter, { useFilters, Accessors } from 'components/ListFilter';
import Loader from 'components/Loader';
import { PaneContext } from 'domains/Townhall/Contexts/Pane';
import useTownhall from 'hooks/useTownhall';

import FeedList from './FeedList';
import { EmptyMessage, RefreshMessage } from './components';
// import { filters as filterFuncs } from './utils';
import useQuestionFeed from './useQuestionFeed';
import usePlaylist from '../usePlaylist';

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

function QuestionFeed({ className, style }: Props) {
    const classes = useStyles();
    const [townhall, isModerator] = useTownhall();
    const [, dispatch] = React.useContext(PaneContext);
    const [sysMessages, setSysMessages] = React.useState<React.ReactNodeArray>(
        []
    );
    const [questions, buffer, flush, isLoading] = useQuestionFeed(townhall._id);
    const accessors = React.useMemo<Accessors<Question>[]>(
        () => [
            (q) => q.question, // question text itself
            (q) => q.meta.createdBy.name.first, // first name of the user
        ],
        []
    );
    const [filteredList, handleSearch, handleFilterChange] = useFilters(
        questions,
        accessors
    );
    const [playlist] = usePlaylist();

    const currentQuestion = React.useMemo(() => {
        const { position, queue } = playlist;
        if (position >= queue.length || position < 0) return undefined;
        return queue[position];
    }, [playlist]);

    React.useEffect(() => {
        dispatch({
            type: 'Question Feed',
            payload: buffer.length,
        });
    }, [buffer.length, dispatch]);

    React.useEffect(() => {
        if (questions.length === 0) {
            setSysMessages([<EmptyMessage />]);
            if (buffer.length > 0) {
                setSysMessages((prev) => [<RefreshMessage />, ...prev]);
            }
        }
    }, [buffer.length, questions.length]);

    if (isLoading) return <Loader />;

    return (
        <Grid
            alignContent='flex-start'
            container
            className={
                className ? clsx([classes.root, className]) : classes.root
            }
            style={style}
        >
            <ListFilter
                className={classes.listFilter}
                // filterMap={filterFuncs}
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
                length={filteredList.length}
                menuIcons={[
                    <Tooltip title='Load New'>
                        <span>
                            <IconButton
                                onClick={flush}
                                color='inherit'
                                disabled={buffer.length === 0}
                            >
                                <Badge
                                    badgeContent={buffer.length}
                                    color='secondary'
                                >
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
                current={currentQuestion}
                questions={filteredList}
                systemMessages={sysMessages}
            />
        </Grid>
    );
}

QuestionFeed.defaultProps = {
    className: undefined,
    style: undefined,
};

export default React.memo(QuestionFeed);
