import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    ListSubheader,
    Avatar,
    Divider,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import history from 'utils/history';

export interface Datum {
    image?: string;
    title: string;
    subtitle: string;
    href: string;
}

export interface Section {
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
    },
    listSection: {
        // backgroundColor: 'inherit',
        marker: 'none',
        backgroundColor: theme.palette.background.paper,
        // margin: `${theme.spacing(2)}px 0px ${theme.spacing(2)}px 0px`,
        // boxShadow: theme.shadows[2],
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
        listStyle: 'none',
    },
}));

/**
 * some description here
 */
export default function SectionList({ sections }: Props) {
    const classes = useStyles();
    return (
        <List className={classes.root} subheader={<li />}>
            {sections.map(({ title, sectionData }) => (
                <li key={title} className={classes.listSection}>
                    <ul className={classes.ul}>
                        <ListSubheader>{title}</ListSubheader>
                        <Divider component='li' />
                        {sectionData.map(
                            (
                                { image, title: listItemTitle, subtitle, href },
                                idx
                            ) => (
                                <li key={idx}>
                                    <ListItem
                                        divider
                                        button
                                        onClick={() => history.push(href)}
                                    >
                                        {image && (
                                            <ListItemAvatar>
                                                <Avatar
                                                    src={image}
                                                    alt='Member of Congress Picture'
                                                />
                                            </ListItemAvatar>
                                        )}
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
