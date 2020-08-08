/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    text: {
        display: 'inline',
    },
});

interface Props {
    fName: string;
    MoC: string;
    topic: string;
    eventDateTime: string;
    constituentScope: string;
    registrationLink: string;
}

export default function EmailPreview(props: Props) {
    const classes = useStyles();
    return (
        <Typography component='div'>
            <p className={classes.text}>
                Dear <mark>{props.fName}</mark>,
            </p>
            <p>
                Your Member of Congress, <mark>{props.MoC}</mark> will be
                participating in an online Deliberative Townhall on
                <mark>&#32;{props.topic}</mark> at{' '}
                <mark>{props.eventDateTime}</mark>. This event is organized by
                Connecting to Congress, an independent, non-partisan initiative
                led by the Ohio State University, whose mission is to connect a
                representative sample of constituents with their elected
                officials in productive online townhall meetings. All{' '}
                <mark>{props.constituentScope}</mark> constituents are invited
                to attend this event; if you would like to participate, please
                register here <mark>{props.registrationLink}</mark>
            </p>
            <p>
                The townhall will be online using the GoToWebcast platform,
                which has a limit of 3000 participants per event. After you
                register, you will receive an email with a unique link to join
                the online townhall, which you can access via smartphone, tablet
                or computer.
            </p>
            <p>
                The townhall will be moderated by the Connecting to Congress
                team. This is an opportunity for you to ask
                <mark>&#32;{props.MoC}</mark> questions and let them know about
                any concerns or problems you have had as a result of the
                COVID-19 pandemic. Our goal for these Deliberative Townhalls is
                to help elected officials hear from not just the loudest and
                most powerful voices in the conversation, but a representative
                cross-section of their constituents, so they can better
                represent their district. We hope you will participate!
            </p>
            <p>Best,</p>
            <p>The Connecting to Congress Team</p>
            <p>
                For more information, please visit:
                https://connectingtocongress.org/
            </p>
        </Typography>
    );
}
