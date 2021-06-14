/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { Grid, Card, List, ListItem } from '@material-ui/core';
import { Pause, PlayArrow } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import type { useQuestionListFragment$key } from '@local/__generated__/useQuestionListFragment.graphql';
import ListFilter, { useFilters, Accessors } from '@local/components/ListFilter';
import { ArrayElement } from '@local/utils/ts-utils';
import { useEvent } from '@local/features/events';
import { useUser } from '@local/hooks';

import { QuestionActions } from '../QuestionActions';
import { QuestionAuthor } from '../QuestionAuthor';
import { QuestionContent } from '../QuestionContent';
import { QuestionQuote } from '../QuestionQuote';
import { QuestionStats } from '../QuestionStats';
import { EmptyMessage, RefreshMessage } from './components';
// import { filters as filterFuncs } from './utils';
import { useQuestionList } from './useQuestionList';

interface Props {
    className?: string;
    style?: React.CSSProperties;
    fragmentRef: useQuestionListFragment$key;
}

const useStyles = makeStyles((theme) => ({
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
    questionActions: {
        padding: 0,
        color: theme.palette.primary.light,
    },
    item: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
}));

export function QuestionList({ className, style, fragmentRef }: Props) {
    const classes = useStyles();
    const [user] = useUser();
    const { isModerator } = useEvent();
    const { questions, connections } = useQuestionList({ fragmentRef });
    // const [isPaused, setIsPaused] = React.useState();

    // function togglePause() {}

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
                // menuIcons={[
                //     <Tooltip title='Load New'>
                //         <span>
                //             <IconButton color='inherit' onClick={togglePause}>
                //                 <Badge badgeContent={isPaused ? 0 : 0} color='secondary'>
                //                     {isPaused ? <PlayArrow /> : <Pause />}
                //                 </Badge>
                //             </IconButton>
                //         </span>
                //     </Tooltip>,
                // ]}
            />
            <div className={classes.content}>
                <Grid container>
                    <Grid item xs={12}>
                        <List disablePadding>
                            {filteredList.map((question) => (
                                <ListItem disableGutters key={question.id}>
                                    <Card className={classes.item}>
                                        <QuestionAuthor fragmentRef={question} />
                                        {question.refQuestion && <QuestionQuote fragmentRef={question.refQuestion} />}
                                        <QuestionContent fragmentRef={question} />
                                        <QuestionActions
                                            className={classes.questionActions}
                                            like={!isModerator && Boolean(user)}
                                            quote={!isModerator && Boolean(user)}
                                            queue={isModerator && Boolean(user)}
                                            connections={connections}
                                            fragmentRef={question}
                                        />
                                        {isModerator && <QuestionStats fragmentRef={question} />}
                                    </Card>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </div>
        </Grid>
    );
}
