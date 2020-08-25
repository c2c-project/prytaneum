import React from 'react';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { ListItemAvatar, Avatar } from '@material-ui/core';
import { Townhall } from '../types';


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




export default function SimpleList(props: Props) {
    const { townhall } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <List>
                {townhall.map((idx) => {
                    return (
                        <div>
                            <ListItem button>
                                <ListItemIcon>
                                    <ListItemAvatar>
                                        <Avatar
                                            src={idx.link}
                                            alt='Member of Congress Picture'
                                        />
                                    </ListItemAvatar>
                                </ListItemIcon>
                                <ListItemText
                                    primary={idx.action}
                                    secondary={idx.date}
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
