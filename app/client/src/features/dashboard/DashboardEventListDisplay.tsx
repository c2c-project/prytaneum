import { Button, Card, CardContent, Grid, List, ListItemSecondaryAction, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useRouter } from 'next/router';

import { DashboardEventListItem } from './DashboardEventListItem';
import { Event } from './DashboardEventList';

const useStyles = makeStyles((theme) => ({
    item: {
        marginBottom: theme.spacing(4),
    },
    card: {
        padding: theme.spacing(1),
    },
    title: {
        marginBottom: theme.spacing(1),
    },
    text: {
        marginLeft: theme.spacing(1),
    },
}));

interface Props {
    eventList: Event[];
    ongoing: boolean;
}

export function DashboardEventListDisplay({ ongoing, eventList }: Props) {
    const classes = useStyles();
    const router = useRouter();
    const handleNav = (path: string) => () => router.push(path);

    return (
        <Grid item xs={12} className={classes.item}>
            <Card className={classes.card}>
                <CardContent>
                    {ongoing ? (
                        <Typography variant='h6' className={classes.title}>
                            Current Events
                        </Typography>
                    ) : (
                        <Typography variant='h6' className={classes.title}>
                            Upcoming Events
                        </Typography>
                    )}

                    {eventList.length > 0 ? (
                        <List>
                            {eventList.map(({ node: event }, idx) => {
                                return (
                                    <DashboardEventListItem
                                        key={event.id}
                                        event={event}
                                        divider={idx !== eventList.length - 1}
                                    >
                                        {ongoing && (
                                            <ListItemSecondaryAction>
                                                <Button
                                                    aria-label='view live feed of current event'
                                                    variant='contained'
                                                    color='primary'
                                                    onClick={handleNav(`/events/${event.id}/live`)}
                                                >
                                                    Live Feed
                                                </Button>
                                            </ListItemSecondaryAction>
                                        )}
                                    </DashboardEventListItem>
                                );
                            })}
                        </List>
                    ) : (
                        <Typography className={classes.text} variant='subtitle2'>
                            No Events To Display
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Grid>
    );
}
