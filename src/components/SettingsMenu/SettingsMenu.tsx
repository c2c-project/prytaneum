import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Grid,
    Button,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    title: {
        padding: theme.spacing(2),
    },
}));

export interface AccordionData {
    title: string;
    description: string;
    component: JSX.Element;
}

interface Props {
    config: AccordionData[];
    // eslint-disable-next-line react/require-default-props
    title?: string;
}

/**
 * Similar to SectionList, but does not use material UI list* and instead just uses the grid to display JSX elements passed in with a title and layout.
 * @category Component
 * @constructor SettingsMenu
 * @param Props
 * @param {string} title title of the section
 * @param {AccordionData[]} config of the content
 */
export default function SettingsMenu({ config, title }: Props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<Set<string>>(new Set());

    const handleChange = (panel: string) => () => {
        const copy = new Set(expanded);
        if (expanded.has(panel)) copy.delete(panel);
        else copy.add(panel);
        setExpanded(copy);
    };

    const toggleExpandAll = () => {
        if (expanded.size > 1) setExpanded(new Set());
        // fancy one liner that isn't very readable :), but it isn't THAT bad -- I think?
        else setExpanded(new Set(config.map((item) => item.title)));
    };

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid
                    item
                    xs={12}
                    container
                    justify='space-between'
                    alignItems='flex-end'
                >
                    <Grid item xs='auto'>
                        {title && (
                            <Typography variant='h4' className={classes.title}>
                                {title}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs='auto'>
                        <Button onClick={toggleExpandAll}>
                            {`${expanded.size > 1 ? 'Hide' : 'Expand'} All`}
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    {config.map(
                        ({ title: sectionTitle, description, component }) => (
                            <Accordion
                                key={sectionTitle}
                                expanded={expanded.has(sectionTitle)}
                                onChange={handleChange(sectionTitle)}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`${sectionTitle}-content`}
                                    id={`${sectionTitle}-header`}
                                >
                                    <Typography className={classes.heading}>
                                        {sectionTitle}
                                    </Typography>
                                    <Typography
                                        className={classes.secondaryHeading}
                                    >
                                        {description}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>{component}</AccordionDetails>
                            </Accordion>
                        )
                    )}
                </Grid>
            </Grid>
        </div>
    );
}
