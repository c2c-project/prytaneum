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
        padding: `${theme.spacing(1)}px 0 ${theme.spacing(1)}px 0`,
        marginLeft: theme.spacing(1),
    },
}));

interface Props {
    title: string;
    content: JSX.Element | JSX.Element[];
    children?: JSX.Element | JSX.Element[];
}
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
