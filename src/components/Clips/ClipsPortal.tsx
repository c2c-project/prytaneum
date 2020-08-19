import React, { useState, useEffect } from 'react';

import {
    Typography,
    Container,
    Grid,
    makeStyles,
    Chip,
    Divider,
    Collapse,
    List,
    ListItem,
    ListItemText,
    IconButton,
    GridListTile,
    GridListTileBar,
    GridList,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ClipDetails from './ClipDetails';
import ClipTable from './ClipTable';
import Thumbnail from '../../assets/default-thumbnail.jpg';
import { ClipData } from '.';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
    },
    thumbnail: {
        maxWidth: '100%',
        height: 'auto',
    },
    collapseRow: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
}));

interface Props {
    clip: ClipData;
}

export default function ClipsPortal({ clip }: Props) {
    const [openSess, setOpenSess] = React.useState(false);
    const [openClips, setOpenClips] = React.useState(false);
    const [openProfile, setOpenProfile] = React.useState(false);


    const handleClick = () => {
        setOpenSess(!openSess);
    };

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container direction='column' justify='flex-start'>
                <img
                    alt='Clip Thumbnail'
                    className={classes.thumbnail}
                    src={Thumbnail}
                />
                <Typography variant='h4' gutterBottom>
                    Mark Takano
                </Typography>
                <Typography variant='caption' gutterBottom>
                    Description
                </Typography>
                <Typography variant='body1' gutterBottom>
                    {clip.title}
                </Typography>
                <Divider />
                <Typography variant='body1' gutterBottom>
                    Links
                </Typography>
                <List>
                    <ListItem button onClick={handleClick}>
                        <ListItemText primary='View Full Video' />
                        {openSess ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openSess} timeout='auto' unmountOnExit>
                        <div className={classes.collapseRow}>
                            <GridList
                                cellHeight={180}
                                className={classes.gridList}
                                cols={2.5}
                            >
                                <GridListTile
                                    key='Subheader'
                                    cols={2}
                                    style={{ height: 'auto' }}
                                />
                                <GridListTile>
                                    <img
                                        src={Thumbnail}
                                        alt='Session Thumbnail'
                                    />
                                    <GridListTileBar
                                        title='Session Title'
                                        subtitle={<span>by: Mark Takano</span>}
                                    />
                                </GridListTile>
                            </GridList>
                        </div>
                    </Collapse>
                    <ListItem
                        button
                        onClick={() => {
                            setOpenClips(!openClips);
                        }}
                    >
                        <ListItemText primary='View Similar Clips' />
                        {openClips ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openClips} timeout='auto' unmountOnExit>
                        <div className={classes.collapseRow}>
                            <GridList
                                cellHeight={180}
                                className={classes.gridList}
                                cols={2.5}
                            >
                                <GridListTile
                                    key='Subheader'
                                    cols={2}
                                    style={{ height: 'auto' }}
                                />
                                <GridListTile>
                                    <img
                                        src={Thumbnail}
                                        alt='Session Thumbnail'
                                    />
                                    <GridListTileBar
                                        title='Session Title'
                                        subtitle={<span>by: Mark Takano</span>}
                                    />
                                </GridListTile>
                            </GridList>
                        </div>
                    </Collapse>
                    <ListItem
                        button
                        onClick={() => {
                            setOpenProfile(!openProfile);
                        }}
                    >
                        <ListItemText primary='View Mark Takano Profile' />
                        {openProfile ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openProfile} timeout='auto' unmountOnExit>
                        <div className={classes.collapseRow}>
                            <GridList
                                cellHeight={180}
                                className={classes.gridList}
                                cols={2.5}
                            >
                                <GridListTile
                                    key='Subheader'
                                    cols={2}
                                    style={{ height: 'auto' }}
                                />
                                <GridListTile>
                                    <img
                                        src={Thumbnail}
                                        alt='Session Thumbnail'
                                    />
                                    <GridListTileBar
                                        title='Session Title'
                                        subtitle={<span>by: Mark Takano</span>}
                                    />
                                </GridListTile>
                            </GridList>
                        </div>
                    </Collapse>
                </List>
            </Grid>
        </div>
    );
}
