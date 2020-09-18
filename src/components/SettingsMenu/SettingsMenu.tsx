import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
    },
    titleContainer: {
        position: 'sticky',
        padding: `${theme.spacing(2)}px 0 ${theme.spacing(2)}px 0`,
        marginLeft: theme.spacing(1),
    },
}));

interface Props {
    title: string;
    content: JSX.Element | JSX.Element[];
}

/**
 * Similar to SectionList, but does not use material UI list* and instead just uses the grid to display JSX elements passed in with a title and layout.
 * @category Component
 * @constructor SettingsMenu
 * @param Props
 * @param {string} title title of the section
 * @param {JSX.Element | JSX.Element[]} content the JSX content to display in the section, useful for defining how specific things in the list should look
 */
export default function SettingsMenu({ title, content }: Props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <Divider />
                    <div className={classes.titleContainer}>
                        <Typography variant='body1' color='textSecondary'>
                            {title}
                        </Typography>
                    </div>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    {content}
                </Grid>
            </Grid>
        </div>
    );
}
