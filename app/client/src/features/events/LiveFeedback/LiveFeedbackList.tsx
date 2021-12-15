import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useUser } from '@local/features/accounts';
import { useLiveFeedbackListFragment$key } from '@local/__generated__/useLiveFeedbackListFragment.graphql';
import { Card, CardContent, CardHeader, Grid, List, ListItem, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { useEvent } from '../useEvent';
import { useLiveFeedbackList } from './useLiveFeedbackList';
import { LiveFeedbackAuthor } from './LiveFeedbackAuthor';

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
}));

export function LiveFeedbackList({ className, style, fragmentRef }: Props) {
    const classes = useStyles();
    const [user] = useUser();
    const { isModerator } = useEvent();
    const { liveFeedback } = useLiveFeedbackList({ fragmentRef });
    // List the feedback given by the participant
    // List all feedback if user is a moderator
    const filteredList = React.useMemo(
        () => liveFeedback.filter(feedback => feedback.createdBy?.id === user?.id), [liveFeedback, user]
    );

    React.useEffect(() => {
        console.log('Unfiltered: ', liveFeedback)
        console.log('Filtered: ', filteredList);
    }, [liveFeedback, filteredList])

    return (
        <Grid alignContent='flex-start' container className={clsx(classes.root, className)} style={style}>
            <div className={classes.content}>
                <Grid container>
                    <Grid item xs={12}>
                        <List disablePadding>
                            {isModerator ? 
                                liveFeedback.map((feedback) => (
                                    <ListItem disableGutters key={feedback.id}>
                                        <Card className={classes.item}>
                                            <LiveFeedbackAuthor fragmentRef={feedback} />
                                            <CardContent>
                                                <Typography>{feedback.message}</Typography>
                                            </CardContent>
                                        </Card>
                                    </ListItem>
                                ))
                                :
                                filteredList.map((feedback) => (
                                    <ListItem disableGutters key={feedback.id}>
                                        <Card className={classes.item}>
                                            <LiveFeedbackAuthor fragmentRef={feedback} />
                                            <CardContent>
                                                <Typography>{feedback.message}</Typography>
                                            </CardContent>
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
