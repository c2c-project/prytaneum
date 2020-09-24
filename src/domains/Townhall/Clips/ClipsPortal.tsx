import React from 'react';

import {
    Typography,
    makeStyles,
    Divider,
    List,
    ListItem,
    Chip,
} from '@material-ui/core';
import useEndpoint from 'hooks/useEndpoint';
import Loader from 'components/Loader';
import { getTownhallClip } from 'domains/Townhall/api';
import Thumbnail from '../../../assets/default-thumbnail.jpg';
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
        flexWrap: 'wrap',
        columnGap: '2px'
    }
}));

interface Props {
    clipData: ClipData;
}

export default function ClipsPortal({ clipData }: Props) {
    const classes = useStyles();
    const [clip, setClip] = React.useState<ClipData | null>(null);
    const [sendRequest, isLoading] = useEndpoint(() => getTownhallClip('1234', '1'), {
        onSuccess: ({data}) => {
            // console.log(data);
            setClip(data.clip);
        }
    });
    // sendRequest at initial opening of page. 
    React.useEffect(() => {
        sendRequest();
    }, []);


    return isLoading ? <Loader /> : (
        
        <section className={classes.root}>
            <List className={classes.links}>
                <img
                    alt='Clip Thumbnail'
                    className={classes.thumbnail}
                    src={Thumbnail}
                />
                <div className={classes.chips}>
                    { clip ? clip.tags.map((tag, index) => {
                        return <Chip key={index} color='primary' clickable size='small' label={tag} />;
                    }): 'clip tags'}
                </div>
                <Typography variant='h4' gutterBottom>
                    { clip ? clip.user: 'Clip UserName'}
                </Typography>
                

                {/* <Chip size='small' label='basic' /> */}
                <Typography variant='caption' gutterBottom>
                    Description
                </Typography>
                <Typography variant='body2' gutterBottom>
                    {/* {clipData.title} */}
                    { clip ? clip.title: 'Clip title'}

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
