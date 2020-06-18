import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import TooltipIconButton from 'components/TooltipIconButton';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography, { TypographyProps } from '@material-ui/core/Typography';

import ShareIcon from '@material-ui/icons/Share';
import DownloadIcon from '@material-ui/icons/CloudDownload';

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: theme.custom.borderRadius,
    },
    media: {
        minHeight: theme.custom.media.minHeight,
        borderRadius: theme.custom.borderRadius,
        margin: '20px',
    },
}));

interface SessionData {
    speaker: string;
    moderator: string;
    topic: string;
    picture: string; // should be a uri or url
    readingMaterials: string; // should be a uri or url
}

interface Props {
    data: SessionData;
}

export default function TownhallPre(props: Props) {
    const classes = useStyles();
    const { data } = props;
    const SubHeader = () => (
        <>
            {/* eslint-disable-next-line react/prop-types */}
            <Typography>{`Topic: ${data.topic}`}</Typography>
            {/* eslint-disable-next-line react/prop-types */}
            <Typography>{`Moderator: ${data.moderator}`}</Typography>
        </>
    );
    return (
        <Card className={classes.root} elevation={8}>
            <CardHeader
                title={data.speaker}
                subheader={<SubHeader />}
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
            <CardMedia className={classes.media} image={data.picture} />
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
                            {`More Information on ${data.speaker}`}
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            onClick={() => console.log('TODO: Submit Question early')}
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
