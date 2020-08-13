import React from 'react';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Appbar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import FolderIcon from '@material-ui/icons/Folder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import Theme from 'theme';
import {
    ListItemText,
    ListItemIcon,
    ListItemSecondaryAction,
} from '@material-ui/core';
import { ClipData } from '.';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        toolbar: {
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
    })
);

function createData(
    timeStamp: string,
    duration: string,
    title: string,
    description: string,
    tags: string[]
): ClipData {
    return { timeStamp, duration, title, description, tags };
}

const tempRows = [
    createData(
        '00:40-1:53',
        '1 min, 23 secs',
        'Question title 1',
        'Session Title',
        ['History', 'Philosophy', 'Prop 60']
    ),
    createData(
        '1:34-2:23',
        '1 min, 23 secs',
        'Question title 2',
        'Session Title',
        ['History', 'A.I']
    ),
    createData(
        '3:40-5:00',
        '1 min, 23 secs',
        'Question title 3',
        'Session Title',
        ['History', 'Philosophy', 'Prop 60']
    ),
    createData(
        '00:40-1:53',
        '1 min, 23 secs',
        'Question title 4',
        'Session Title',
        ['History', 'Philosophy', 'Prop 60']
    ),
    createData(
        '00:40-1:53',
        '1 min, 23 secs',
        'Question title 5',
        'Session Title',
        ['History', 'Philosophy', 'Prop 60']
    ),
];

export default function ClipList() {
    const classes = useStyles();

    return (
        <section>
            <Toolbar className={classes.toolbar}>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <IconButton>
                    <FilterListIcon />
                </IconButton>
            </Toolbar>
            <Grid item xs={12} md={6}>
                <div>
                    <List>
                        {tempRows.map((row) => {
                            return (
                                <ListItem button onClick={() => {}}>
                                    <ListItemIcon>
                                        <FolderIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary='Luke SkyWalker'
                                        secondary={row.title}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge='end'
                                            aria-label='delete'
                                        >
                                            <FavoriteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            );
                        })}
                    </List>
                </div>
            </Grid>
        </section>
    );
}
