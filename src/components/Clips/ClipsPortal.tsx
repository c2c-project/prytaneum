import React from 'react';

import {
    Typography,
    makeStyles,
    Divider,
    List,
    ListItem,
    Chip,
} from '@material-ui/core';
import Thumbnail from '../../assets/default-thumbnail.jpg';
import { ClipData } from '.';

const useStyles = makeStyles(() => ({
    root: {},
    thumbnail: {
        maxWidth: '100%',
        height: 'auto',
    },
    links: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: '10px',
    },
    chips: {
        display: 'flex',
        columnGap: '2px'
    }
}));

interface Props {
    clip: ClipData;
}

export default function ClipsPortal({ clip }: Props) {
    const classes = useStyles();

    return (
        <section className={classes.root}>
            <List className={classes.links}>
                <img
                    alt='Clip Thumbnail'
                    className={classes.thumbnail}
                    src={Thumbnail}
                />
                <div className={classes.chips}>
                    {clip.tags.map((tag, index) => {
                        return <Chip color='primary' clickable size='small' label={tag} />;
                    })}
                </div>
                <Typography variant='h4' gutterBottom>
                    Mark Takano
                </Typography>
                

                {/* <Chip size='small' label='basic' /> */}
                <Typography variant='caption' gutterBottom>
                    Description
                </Typography>
                <Typography variant='body2' gutterBottom>
                    {clip.title}
                </Typography>
                <Divider />
                <Typography variant='caption' gutterBottom>
                    Links
                </Typography>
                <ListItem button disableGutters>
                    <Typography variant='h6' gutterBottom>
                        View Full Video
                    </Typography>
                </ListItem>
                <Divider />
                <ListItem button disableGutters>
                    <Typography variant='h6' gutterBottom>
                        View Similar Clips
                    </Typography>
                </ListItem>
                <Divider />
                <ListItem button disableGutters>
                    <Typography variant='h6' gutterBottom>
                        View Mark Takano
                    </Typography>
                </ListItem>
                <Divider />
            </List>
        </section>
    );
}
