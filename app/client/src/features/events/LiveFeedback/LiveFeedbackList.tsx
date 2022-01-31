import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useLiveFeedbackListFragment$key } from '@local/__generated__/useLiveFeedbackListFragment.graphql';
import ListFilter, { useFilters, Accessors } from '@local/components/ListFilter';
import { ArrayElement } from '@local/utils/ts-utils';
import { Card, CardContent, Grid, List, ListItem, Typography, CardActions } from '@material-ui/core';
import clsx from 'clsx';
import { useUser } from '@local/features/accounts';
import { useLiveFeedbackList } from './useLiveFeedbackList';
import { LiveFeedbackAuthor } from './LiveFeedbackAuthor';
import { useEvent } from '../useEvent';
import { LiveFeedbackReplyAction } from './LiveFeedbackReplyAction';
import { LiveFeedbackReply } from './LiveFeedbackReply';

interface Props {
    className?: string;
    style?: React.CSSProperties;
    fragmentRef: useLiveFeedbackListFragment$key;
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
    item: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    body: {
        margin: theme.spacing(-2, 0, -1, 0) // removes extra padding in cards
    },
}));

export function LiveFeedbackList({ className, style, fragmentRef }: Props) {
    const [user] = useUser();
    const classes = useStyles();
    const [displayLiveFeedback, setDisplayLiveFeedback] = React.useState(false);
    const { liveFeedback } = useLiveFeedbackList({ fragmentRef });
    const { isModerator } = useEvent();

    const accessors = React.useMemo<Accessors<ArrayElement<typeof liveFeedback>>[]>(
        () => [
            (f) => f?.message || '', // feedback text itself
            (f) => f?.createdBy?.firstName || '', // first name of the user
        ],
        []
    );

    const [filteredList, handleSearch, handleFilterChange] = useFilters(liveFeedback, accessors);

    React.useEffect(() => {
        if (!user) setDisplayLiveFeedback(false);
        else setDisplayLiveFeedback(true);
    }, [user, isModerator]);

    return (
        <Grid alignContent='flex-start' container className={clsx(classes.root, className)} style={style}>
            <div className={classes.content}>
                <Grid container>
                    <Grid item xs={12}>
                        <ListFilter
                            className={classes.listFilter}
                            onFilterChange={handleFilterChange}
                            onSearch={handleSearch}
                            length={filteredList.length}
                        />
                        <List disablePadding>
                            {displayLiveFeedback ? (
                                liveFeedback.filter(feedback => filteredList.includes(feedback)).map((feedback) => (
                                    <ListItem disableGutters key={feedback.id}>
                                        <Card className={classes.item}>
                                            <LiveFeedbackAuthor fragmentRef={feedback} />
                                            {feedback.refFeedback && <LiveFeedbackReply fragmentRef={feedback.refFeedback} />}
                                            <CardContent className={classes.body}>
                                                <Typography variant='inherit' style={{ wordBreak: 'break-word' }}>
                                                    {feedback.message}
                                                </Typography>
                                            </CardContent>
                                            {isModerator ? <CardActions>
                                                <LiveFeedbackReplyAction fragmentRef={feedback} />
                                            </CardActions> : <></>}
                                        </Card>
                                    </ListItem>
                                ))
                            ) : (
                                <Typography align='center'>Sign in to submit Live Feedback</Typography>
                            )}
                        </List>
                    </Grid>
                </Grid>
            </div>
        </Grid>
    );
}
