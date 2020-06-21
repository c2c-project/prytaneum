import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import TooltipIconButton from 'components/TooltipIconButton';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import clsx from 'clsx';
import { format } from 'date-fns';

import ShareIcon from '@material-ui/icons/Share';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import { Townhall } from '../api';

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: theme.custom.borderRadius,
    },
    media: {
        minHeight: theme.custom.media.minHeight,
        borderRadius: theme.custom.borderRadius,
        margin: '20px',
    },
    title: {
        fontSize: '25px',
    },
    text: {
        fontWeight: theme.typography.fontWeightLight,
    },
    largeAvatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

interface Props {
    townhall: Townhall;
}

export default function TownhallPre(props: Props) {
    const classes = useStyles();
    const { townhall } = props;
    return (
        <Card className={classes.root} elevation={8}>
            <CardHeader
                avatar={
                    <Avatar
                        className={classes.largeAvatar}
                        src={townhall.picture}
                    />
                }
                title={
                    <>
                        <Typography
                            className={clsx([classes.text, classes.title])}
                        >
                            {townhall.speaker}
                        </Typography>
                        <Typography className={classes.text}>
                            {townhall.topic}
                        </Typography>
                    </>
                }
                subheaderTypographyProps={{ className: classes.text }}
                subheader={format(townhall.date, 'MM/dd/yyyy p')}
                action={
                    <>
                        <TooltipIconButton
                            onClick={() => console.log('TODO: share button')}
                            tooltip='Share'
                        >
                            <ShareIcon />
                        </TooltipIconButton>
                        <TooltipIconButton
                            onClick={() =>
                                console.log('TODO: download calendar event')
                            }
                            tooltip='Download Calendar Invite'
                        >
                            <DownloadIcon />
                        </TooltipIconButton>
                    </>
                }
            />
            <CardMedia className={classes.media} image={townhall.picture} />
            <CardActions>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Button
                            onClick={() =>
                                console.log('TODO: reading materials')
                            }
                            fullWidth
                        >
                            View Topic Reading Material
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            onClick={() => console.log('TODO: Stats page')}
                            fullWidth
                        >
                            {`More Information on ${townhall.speaker}`}
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            onClick={() =>
                                console.log('TODO: Submit Question early')
                            }
                            fullWidth
                        >
                            Help I&apos;m unable to attend!
                        </Button>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}
