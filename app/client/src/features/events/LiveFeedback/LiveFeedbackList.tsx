import * as React from 'react';
import { Card, CardContent, Grid, List, ListItem, Typography, CardActions } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';

import { useLiveFeedbackListFragment$key } from '@local/__generated__/useLiveFeedbackListFragment.graphql';
import ListFilter, { useFilters, Accessors } from '@local/components/ListFilter';
import { ArrayElement } from '@local/utils/ts-utils';
import { useUser } from '@local/features/accounts';
import { useLiveFeedbackList } from './useLiveFeedbackList';
import { LiveFeedbackAuthor } from './LiveFeedbackAuthor';
import { useEvent } from '../useEvent';
import { LiveFeedbackReplyAction } from './LiveFeedbackReplyAction';
import { LiveFeedbackReply } from './LiveFeedbackReply';

const useStyles = makeStyles((theme) => ({
    root: {
        // padding: theme.spacing(1.5),
    },
    listFilter: {
        flex: 1,
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
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
        margin: theme.spacing(-2, 0, -1, 0), // removes extra padding in cards
    },
    notSignedInMessage: {
        paddingTop: theme.spacing(2), // add padding since number of results were hidden
    },
}));

interface LiveFeedbackListProps {
    fragmentRef: useLiveFeedbackListFragment$key;
    ActionButtons: React.ReactNode;
    isVisible: boolean;
}

export function LiveFeedbackList({ fragmentRef, ActionButtons, isVisible }: LiveFeedbackListProps) {
    const theme = useTheme();
    const classes = useStyles();
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

    return (
        <Grid
            container
            height={0}
            flex='1 1 100%'
            justifyContent='center'
            sx={{ visibility: isVisible ? 'visible' : 'hidden' }}
        >
            {isVisible && (
                <Grid
                    item
                    paddingTop='1rem'
                    xs={12}
                    sx={{
                        border: 5,
                        borderImage: `linear-gradient(${theme.palette.custom.creamCan},${alpha(
                            theme.palette.custom.creamCan,
                            0.06
                        )}) 10`,
                        backgroundColor: alpha(theme.palette.custom.creamCan, 0.06),
                    }}
                >
                    {ActionButtons}
                    <ListFilter
                        className={classes.listFilter}
                        onFilterChange={handleFilterChange}
                        onSearch={handleSearch}
                        length={filteredList.length}
                        displayNumResults={Boolean(user)} // only display for users logged in
                    />
                    <List disablePadding>
                        {displayLiveFeedback ? (
                            filteredList.map((feedback) => (
                                <ListItem disableGutters key={feedback.id} sx={{ paddingX: '0.5rem' }}>
                                    <Card className={classes.item}>
                                        <LiveFeedbackAuthor fragmentRef={feedback} />
                                        {feedback.refFeedback && (
                                            <LiveFeedbackReply fragmentRef={feedback.refFeedback} />
                                        )}
                                        <CardContent className={classes.body}>
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
                            <Typography align='center' className={classes.notSignedInMessage}>
                                Sign in to submit Live Feedback
                            </Typography>
                        )}
                    </List>
                </Grid>
            )}
        </Grid>
    );
}
