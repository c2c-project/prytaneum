/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import {
    Card,
    CardContent,
    Grid,
    Typography,
    Divider,
    Button,
    IconButton,
    Chip,
    DialogTitle,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import makeStyles from '@mui/styles/makeStyles';
import HelpIcon from '@mui/icons-material/Help';

const useStyles = makeStyles((theme) => ({
    item: {
        margin: theme.spacing(0, 0, 4, 0),
    },
    card: {
        padding: theme.spacing(1, 1, 1, 1),
    },
    title: {
        marginBottom: theme.spacing(1),
    },
    text: {
        marginLeft: theme.spacing(1),
    },
    secondaryText: {
        color: theme.palette.text.secondary,
    },
    chip: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        textTransform: 'uppercase',
    },
    relative: {
        position: 'relative',
        width: '100%',
    },
    topleft: {
        position: 'absolute',
        top: '-0.75rem',
        left: '-1.25rem',
        zIndex: 100,
    },
    topright: {
        position: 'absolute',
        top: '-0.75rem',
        right: '-1.25rem',
        zIndex: 100,
    },
    topmid: {
        position: 'absolute',
        top: '-0.75rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
    },
}));

const dummyCurrentEvents = [
    {
        title: 'Event 1',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        link: '/dashboard',
    },
    {
        title: 'Event 2',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        link: '/dashboard',
    },
];

const dummyFutureEvents = [
    {
        title: 'Event 1',
        date: 'Monday, July 12th',
        link: '/dashboard',
    },
    {
        title: 'Event 2',
        date: 'Friday, July 17th',
        link: '/dashboard',
    },
    {
        title: 'Event 3',
        date: 'Friday, July 31st',
        link: '/dashboard',
    },
];

export function DashboardDemo() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [infoIndex, setInfoIndex] = React.useState(0);

    const info = [
        {
            title: 'Current Events',
            text: 'This card will display events that are currently taking place. Clicking on the LIVE FEED button will take you to the event.',
        },
        {
            title: 'Upcoming Events',
            text: 'This card will display your upcoming events with the closest event at the top.',
        },
    ];

    const handleClickOpen = (index: number) => {
        setInfoIndex(index - 1);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid container>
            <Grid item xs={12} className={classes.item}>
                <Card className={classes.card}>
                    <CardContent>
                        <div className={classes.relative}>
                            <Chip
                                color='secondary'
                                icon={<HelpIcon />}
                                label='1'
                                size='small'
                                onClick={() => handleClickOpen(1)}
                            />

                            <Typography variant='h6' className={classes.title}>
                                Current Events
                            </Typography>
                        </div>
                        <Grid container justifyContent='space-between' alignItems='center' spacing={1}>
                            {dummyCurrentEvents.map(({ title, description }, idx) => (
                                <React.Fragment key={idx}>
                                    <Grid item xs={12} sm={8} className={classes.text}>
                                        <Typography variant='subtitle2'>{title}</Typography>
                                        <Typography variant='body2' className={classes.secondaryText}>
                                            {description}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            aria-label='view live feed of current event'
                                            variant='contained'
                                            color='primary'
                                        >
                                            Live Feed
                                        </Button>
                                    </Grid>
                                    {idx !== dummyCurrentEvents.length - 1 && (
                                        <Grid item xs={12} style={{ marginTop: 2 }}>
                                            <Divider />
                                        </Grid>
                                    )}
                                </React.Fragment>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} className={classes.item}>
                <Card className={classes.card}>
                    <CardContent>
                        <div className={classes.relative}>
                            <Chip
                                color='secondary'
                                icon={<HelpIcon />}
                                label='2'
                                size='small'
                                onClick={() => handleClickOpen(2)}
                            />

                            <Typography variant='h6' className={classes.title}>
                                Upcoming Events
                            </Typography>
                        </div>
                        <Grid container justifyContent='space-between' alignItems='center' spacing={1}>
                            {dummyFutureEvents.map(({ title, date }, idx) => (
                                <React.Fragment key={idx}>
                                    <Grid item className={classes.text}>
                                        <Typography variant='subtitle2'>{title}</Typography>
                                        <Typography variant='body2' className={classes.secondaryText}>
                                            {date}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton aria-label='view future event' size='large'>
                                            <ChevronRight />
                                        </IconButton>
                                    </Grid>
                                    {idx !== dummyFutureEvents.length - 1 && (
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>
                                    )}
                                </React.Fragment>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{info[infoIndex].title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{info[infoIndex].text}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}
