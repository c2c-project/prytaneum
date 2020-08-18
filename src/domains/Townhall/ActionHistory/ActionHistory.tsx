import React from 'react';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { ListItemAvatar, Avatar } from '@material-ui/core';
import { getTownhallList } from '../api';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    })
);

interface Props {
    townhall: Townhall;
}

function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
    return <ListItem button component='a' {...props} />;
}

export default function SimpleList(props: Props) {
    const { townhall } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <List component='nav'>
                {townhall.map((person, index) => {
                    return (
                        <div>
                            <ListItem button>
                                <ListItemIcon>
                                    <ListItemAvatar>
                                        <Avatar
                                            src={person.link}
                                            alt='Member of Congress Picture'
                                        />
                                    </ListItemAvatar>
                                </ListItemIcon>
                                <ListItemText
                                    primary={person.action}
                                    secondary={person.date}
                                />
                            </ListItem>
                            <Divider />
                        </div>
                    );
                })}
            </List>
        </div>
    );
}
