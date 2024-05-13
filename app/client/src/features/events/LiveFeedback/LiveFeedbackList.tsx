import * as React from 'react';
import { Card, CardContent, Grid, List, ListItem, Typography, CardActions } from '@mui/material';

import { useLiveFeedbackListFragment$key } from '@local/__generated__/useLiveFeedbackListFragment.graphql';
import ListFilter, { useFilters, Accessors } from '@local/components/ListFilter';
import { ArrayElement } from '@local/utils/ts-utils';
import { useUser } from '@local/features/accounts';
import { useLiveFeedbackList } from './useLiveFeedbackList';
import { LiveFeedbackAuthor } from './LiveFeedbackAuthor';
import { useEvent } from '../useEvent';
import { LiveFeedbackReplyAction } from './LiveFeedbackReplyAction';
import { LiveFeedbackReply } from './LiveFeedbackReply';

interface LiveFeedbackListProps {
    fragmentRef: useLiveFeedbackListFragment$key;
    ActionButtons: React.ReactNode;
    isVisible: boolean;
}

export function LiveFeedbackList({ fragmentRef, ActionButtons, isVisible }: LiveFeedbackListProps) {
    const { user } = useUser();
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

    if (!isVisible) return <React.Fragment />;

    return (
        <Grid container height={0} flex='1 1 100%' justifyContent='center'>
            <Grid item paddingTop='1rem' width='100%'>
                {ActionButtons}
                <ListFilter
                    style={{ flex: 1, paddingLeft: '0.5rem', paddingRight: '0.5rem' }}
                    onFilterChange={handleFilterChange}
                    onSearch={handleSearch}
                    length={filteredList.length}
                    displayNumResults={Boolean(user)} // only display for users logged in
                />
                <List disablePadding>
                    {displayLiveFeedback ? (
                        filteredList.map((feedback) => (
                            <ListItem disableGutters key={feedback.id} sx={{ paddingX: '0.5rem' }}>
                                <Card style={{ flex: 1, flexDirection: 'column' }}>
                                    <LiveFeedbackAuthor fragmentRef={feedback} />
                                    {feedback.refFeedback && <LiveFeedbackReply fragmentRef={feedback.refFeedback} />}
                                    <CardContent sx={{ margin: (theme) => theme.spacing(-2, 0, -1, 0) }}>
                                        <Typography variant='inherit' style={{ wordBreak: 'break-word' }}>
                                            {feedback.message}
                                        </Typography>
                                    </CardContent>
                                    {isModerator ? (
                                        <CardActions>
                                            <LiveFeedbackReplyAction fragmentRef={feedback} />
                                        </CardActions>
                                    ) : (
                                        <React.Fragment />
                                    )}
                                </Card>
                            </ListItem>
                        ))
                    ) : (
                        <Typography align='center' sx={{ paddingTop: (theme) => theme.spacing(2) }}>
                            Sign in to submit Live Feedback
                        </Typography>
                    )}
                </List>
            </Grid>
        </Grid>
    );
}
