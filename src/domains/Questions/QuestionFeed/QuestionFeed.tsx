/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { IconButton, Grid, Badge, Tooltip } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import { makeStyles } from '@material-ui/core/styles';

import { UserContext } from 'contexts/User';
import ListFilter, { useFilters } from 'components/ListFilter';
import Loader from 'components/Loader';
import { TownhallContext } from 'domains/Townhall/Contexts/Townhall';
import { PaneContext } from 'domains/Townhall/Contexts/Pane';

import { QuestionProps } from '../QuestionFeedItem';
import FeedList from './FeedList';
import { EmptyMessage, RefreshMessage } from './components';
import { filters as filterFuncs, makeSystemMessage } from './utils';
import useQuestionFeed from './useQuestionFeed';

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
    const [sysMessages, setSysMessages] = React.useState<QuestionProps[]>([]);
    const [questions, buffer, flush, isLoading] = useQuestionFeed(townhall._id);
    const [filteredList, handleSearch, handleFilterChange] = useFilters(
        questions,
        [
            (q) => q.question, // question text itself
            (q) => q.meta.createdBy.name.first, // first name of the user
        ]
    );

    // there should never be more than 1 current question, so we can stop at the first one found
    // TODO: update to use the townhall state instead
    const currentQuestion = React.useMemo(
        () => questions.find((q) => q.state === 'current'),
        [questions]
    );

    const isModerator = React.useMemo(
        () =>
            user &&
            townhall.settings.moderators.list.find(
                ({ email }) => user.email.address === email
            ),
        [townhall.settings.moderators.list, user]
    );
    React.useEffect(() => {
        dispatch({
            type: 'Question Feed',
            payload: buffer.length,
        });
    }, [buffer.length, dispatch]);

    React.useEffect(() => {
        if (questions.length === 0) {
            setSysMessages([makeSystemMessage(<EmptyMessage />)]);
            if (buffer.length > 0) {
                setSysMessages((prev) => [
                    makeSystemMessage(<RefreshMessage />),
                    ...prev,
                ]);
            }
        }
    }, [buffer.length, questions.length]);

    if (isLoading) return <Loader />;

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
            <Grid container justify='center'>
                <FeedList
                    variant={isModerator ? 'moderator' : 'user'}
                    current={currentQuestion}
                    questions={filteredList}
                    systemMessages={sysMessages}
                />
            </Grid>
        </div>
    );
}

export default React.memo(QuestionFeed);
