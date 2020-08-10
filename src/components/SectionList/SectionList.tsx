import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    ListSubheader,
    Avatar,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

interface Datum {
    image: string;
    title: string;
    subtitle: string;
}

interface Section {
    title: string;
    sectionData: Datum[];
}

interface Props {
    sections: Section[];
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
}));

export default function SectionList({ sections }: Props) {
    const classes = useStyles();
    return (
        <List className={classes.root} subheader={<li />}>
            {sections.map(({ title, sectionData }) => (
                <li key={title} className={classes.listSection}>
                    <ul className={classes.ul}>
                        <ListSubheader>{title}</ListSubheader>
                        {sectionData.map(
                            (
                                { image, title: listItemTitle, subtitle },
                                idx
                            ) => (
                                <li key={idx}>
                                    <ListItem divider button>
                                        <ListItemAvatar>
                                            <Avatar
                                                src={image}
                                                alt='Member of Congress Picture'
                                            />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={listItemTitle}
                                            secondary={subtitle}
                                        />
                                    </ListItem>
                                </li>
                            )
                        )}
                    </ul>
                </li>
            ))}
        </List>
    );
}
