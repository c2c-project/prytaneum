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

/** SectionList returns a list of sections that display the corresponding Congressmembers and their pictures
 *  So you can have one section for a County and then their accompanying Congressmembers
 *  @category Component
 *  @constructor SectionList
 *  @param props
 *  @param {Section[]} props.sections consists of the Sections to iterate through <br><br> A Section consits of Title and a Datum[]
*/
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
