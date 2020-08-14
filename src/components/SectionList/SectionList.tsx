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

interface Datum {
    image?: string;
    title: string;
    subtitle: string;
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

<<<<<<< HEAD
/** SectionList returns a list of sections that display the corresponding Congressmembers and their pictures
 *  So you can have one section for a County and then their accompanying Congressmembers
 *  @category Component
 *  @constructor SectionList
 *  @param props
 *  @param {Section[]} props.sections consists of the Sections to iterate through <br><br> A Section consits of Title and a Datum[]
*/
=======
/**
 * some description here
 */
>>>>>>> ae9e94d4142381e48183ff99649042d7be5b9f5d
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
                                { image, title: listItemTitle, subtitle },
                                idx
                            ) => (
                                <li key={idx}>
                                    <ListItem divider button>
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
