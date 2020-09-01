import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

interface props {
    pictureUrl: string;
    githubLink: string;
    linkedInLink: string;
    fullName: string;
    description: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        large: {
            width: theme.spacing(13),
            height: theme.spacing(13),
        },

        card: {
            maxHeight: theme.spacing(80),
            maxWidth: theme.spacing(40),
            padding: 20,
        },
        black: {
            color: theme.palette.common.black,
        },
    })
);

export default function ProfileCard({
    pictureUrl,
    fullName,
    description,
    githubLink,
    linkedInLink,
}: props) {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <Grid
                spacing={2}
                container
                direction='column'
                alignItems='center'
                justify='center'
            >
                <Grid item>
                    <Avatar
                        className={classes.large}
                        alt={fullName}
                        src={pictureUrl}
                    />
                </Grid>
                <Grid item>
                    <Typography variant='h5'>{fullName}</Typography>
                </Grid>
                <Grid item>
                    <Typography align='center'>{description}</Typography>
                </Grid>
                <Grid item container direction='row' justify='center'>
                    {githubLink && (
                        <Grid item>
                            <IconButton
                                className={classes.black}
                                aria-label='Github Link'
                            >
                                <GitHubIcon />
                            </IconButton>
                        </Grid>
                    )}
                    {linkedInLink && (
                        <Grid item>
                            <IconButton
                                color='primary'
                                aria-label='LinkedIn Link'
                            >
                                <LinkedInIcon />
                            </IconButton>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Card>
    );
}
