import * as React from 'react';
import Image from 'next/image';
import { Grid, Typography, Paper, Button, IconButton } from '@material-ui/core';
import { TextField } from '@local/components/TextField';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import { useUser } from '@local/features/accounts';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: '85vh',
        paddingLeft: '1rem',
    },
    subtitle: {
        color: 'gray',
    },
    icon: {
        fontSize: '2.25rem'
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    subsection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        maxWidth: 425,
        padding: theme.spacing(2),
        margin: theme.spacing(1),
    },
    subpaper: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: theme.spacing(2),
    },
    buttonwrapper: {
        display: 'flex',
        gap: '0.5rem',
        alignSelf: 'end',
    },
    buttonicon: {
        marginRight: '0.5rem',
    },
    dropdown: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));

export default function UserGuide() {
    const classes = useStyles();
    const router = useRouter();

    const [user] = useUser();

    React.useEffect(() => {
        if (user) router.push('/app/home');
    }, [user, router]);

    return (
        <Grid container alignItems='center' className={classes.root} justify='center' spacing={2}>
            <Grid item xs={3}>
                <Image
                    src='https://i.ibb.co/qmXt8Fw/prytaneum-logo-filled.png' 
                    width={1107}
                    height={1108}
                    objectFit='contain'
                />
            </Grid>
            <Grid item xs={9} className={classes.section}>
                <Typography variant='h3'>
                    <BookOutlinedIcon className={classes.icon}/> Guide to Prytaneum: Participant
                </Typography>
                <Typography variant='body1'>
                    Participants are the residents who want to engage in discussion on a 
                    policy topic. In Prytaneum, participants can type in questions to add to a 
                    question list; they can like, reply and quote another participant’s 
                    question to follow up on one another’s questions. 
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.section}>
                <Typography variant='h3'>
                    Attending a Town Hall
                </Typography>
                <Typography variant='body1'>
                    To attend a town hall event, you must be invited to the event by the
                    organizer through email or a direct link.
                </Typography>
                <Typography variant='body1'>
                    Clicking on a Prytaneum invite link will direct you to the event where you 
                    can interact with the town hall through participant actions.
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.section}>
                <Typography variant='h3'>
                    Participant Town Hall Interactions
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} className={classes.subsection}>
                <Paper className={classes.paper}>
                    <Typography variant='h5'>
                        Question Form
                    </Typography>
                    <TextField
                        label='Your Question'
                        fullWidth
                    />
                    <div className={classes.buttonwrapper}>
                        <Button color='primary'>
                            Cancel
                        </Button>
                        <Button variant='contained' color='primary'>
                            Ask
                        </Button>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} className={classes.subsection}>
                <Typography variant='body1'>
                    <sup>1</sup> This prompt will appear after pressing the button, it will ask 
                    you to write in your question and submit it to the town hall
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} className={classes.subsection}>
                <Typography variant='body1'>
                    <sup>2</sup> Clicking the down arrow toggles the visibility of the event’s 
                    description
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} className={classes.subsection}>
                <Paper className={classes.paper}>
                    <div className={classes.dropdown}>
                        <div>
                            <Typography variant='h5'>
                                Town Hall Meeting
                            </Typography>
                            <Typography variant='subtitle2' className={classes.subtitle}>
                                Demonstrating features and updates
                            </Typography>
                        </div>
                        <div>
                            <IconButton>
                                <KeyboardArrowUpIcon />
                            </IconButton>
                        </div>
                    </div>
                    <Typography variant='subtitle2'>
                        More details can be found here!
                    </Typography>
                    <Button fullWidth variant='contained' color='primary'>
                        <QuestionAnswerIcon className={classes.buttonicon}/> Ask My Question
                    </Button>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} className={classes.subsection}>
                <Paper className={classes.paper}>
                    <Typography variant='h5'>
                        Question Form
                    </Typography>
                    <Paper className={classes.subpaper}>
                        <Typography variant='subtitle2'>
                            Florian
                        </Typography>
                        <Typography variant='overline'>
                            9:51 PM · 10/11/2021
                        </Typography>
                        <Typography variant='subtitle2'>
                            Interactivity is important!
                        </Typography>
                    </Paper>
                    <TextField
                        label='Your Question'
                        fullWidth
                    />
                    <div className={classes.buttonwrapper}>
                        <Button color='primary'>
                            Cancel
                        </Button>
                        <Button variant='contained' color='primary'>
                            Ask
                        </Button>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} className={classes.subsection}>
                <Typography variant='body1'>
                    <sup>3</sup> Similar to pressing the &quot;Ask My Question&quot; button,
                    you will be asked to write in your question with the question you want to 
                    quote
                </Typography>
            </Grid>
        </Grid>
    );
}