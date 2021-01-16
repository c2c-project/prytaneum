import React from 'react';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { ListItemAvatar, Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    })
);

export interface TownHallHistoryEntry {
    action: string;
    link: string;
    date: string;
}

interface Props {
    history: TownHallHistoryEntry[];
}

export default function SimpleList(props: Props) {
    const { history } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <List>
                {history.map(({ action, link, date }) => {
                    return (
                        <div key={action}>
                            <ListItem button>
                                <ListItemIcon>
                                    <ListItemAvatar>
                                        <Avatar
                                            src={link}
                                            alt='Member of Congress Picture'
                                        />
                                    </ListItemAvatar>
                                </ListItemIcon>
                                <ListItemText
                                    primary={action}
                                    secondary={date}
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
