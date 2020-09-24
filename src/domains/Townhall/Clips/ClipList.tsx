import React from 'react';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import FolderIcon from '@material-ui/icons/Folder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import {
    ListItemText,
    ListItemIcon,
    ListItemSecondaryAction,
} from '@material-ui/core';
import useEndpoint from 'hooks/useEndpoint';
import Loader from 'components/Loader';
import { ClipData } from '.';
import { getTownhallClips } from '../api';

const useStyles = makeStyles(() =>
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

export default function ClipList() {
    const classes = useStyles();
    const [clips, setClips] = React.useState<ClipData[] | null>(null);
    const [sendRequest, isLoading] = useEndpoint(
        () => getTownhallClips('1234'),
        {
            onSuccess: ({ data }) => {
                // console.log(data);
                setClips(data.clips);
            },
        }
    );
    React.useEffect(() => {
        sendRequest();
    }, []);

    return isLoading ? (
        <Loader />
    ) : (
        <section>
            <Toolbar className={classes.toolbar} disableGutters>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <IconButton>
                    <FilterListIcon />
                </IconButton>
            </Toolbar>
            <div>
                <List>
                    {clips ? (
                        clips.map((row, index) => {
                            return (
                                <ListItem key={index} button onClick={() => {}}>
                                    <ListItemIcon>
                                        <FolderIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={row.user}
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
                        })
                    ) : (
                        <ListItem button onClick={() => {}}>
                            <ListItemIcon>
                                <FolderIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary='Null title'
                                secondary='Null secondary title'
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge='end' aria-label='delete'>
                                    <FavoriteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )}
                </List>
            </div>
        </section>
    );
}
