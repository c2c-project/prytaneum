import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
    },
    container: {
        marginTop: theme.spacing(4),
    },
    componentTitle: {
        margin: theme.spacing(0, 0, 2, 0),
    },
    componentDivider: {
        marginTop: theme.spacing(2),
    },
}));

export interface AccordionData {
    title: string;
    description: string;
    component: JSX.Element | ((b: boolean) => JSX.Element) | null;
}

interface Props {
    config: AccordionData[];
}

/**
 * Similar to SectionList, but does not use material UI list* and instead just uses the grid to display JSX elements passed in with a title and layout.
 * @category Component
 * @constructor SettingsMenu
 * @param Props
 * @param {AccordionData[]} config of the content
 */
export function SettingsMenu({ config }: Props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {config.map(
                ({ title: sectionTitle, description, component }, idx) =>
                    component && (
                        <Grid container className={classes.container} key={sectionTitle}>
                            <Grid item xs={12} className={classes.componentTitle}>
                                <Typography variant='h5'>{sectionTitle}</Typography>
                                <Typography variant='body2' color='textSecondary'>
                                    {description}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                {component}
                            </Grid>
                            {idx !== config.length - 1 && (
                                <Grid item xs={12}>
                                    <Divider className={classes.componentDivider} />
                                </Grid>
                            )}
                        </Grid>
                    )
            )}
        </div>
    );
}
