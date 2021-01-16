import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Grid,
    IconButton,
    Menu,
    MenuItem,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { motion } from 'framer-motion';
import { PopmotionTransitionProps } from 'framer-motion/types/types';

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
        flex: 1,
        [theme.breakpoints.down('md')]: {
            paddingLeft: theme.spacing(1),
        },
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(1),
    },
    titlebar: {
        paddingTop: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
}));

export interface AccordionData {
    title: string;
    description: string;
    component: JSX.Element | ((b: boolean) => JSX.Element);
}

interface Props {
    config: AccordionData[];
    title: string;
}

const transition: PopmotionTransitionProps = {
    // type: 'spring',
    // damping: 13,
    // stiffness: 150,
    ease: 'easeOut',
};

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
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

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

    type MyEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;
    const handleClick = ({ currentTarget }: MyEvent) => {
        setAnchorEl(currentTarget);
    };

    function getDetails(
        component: JSX.Element | ((b: boolean) => JSX.Element),
        sectionTitle: string
    ) {
        return typeof component === 'function'
            ? component(expanded.has(sectionTitle))
            : component;
    }

    return (
        <div className={classes.root}>
            <Menu
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem onClick={toggleExpandAll}>
                    {`${expanded.size > 1 ? 'Hide' : 'Expand'} All`}
                </MenuItem>
            </Menu>
            <Grid container>
                <Grid
                    item
                    xs={12}
                    container
                    justify='space-between'
                    alignItems='center'
                    className={classes.titlebar}
                >
                    <motion.div
                        initial={{ x: -50 }}
                        animate={{ x: 0 }}
                        exit={{ x: -50, opacity: 0 }}
                        transition={transition}
                    >
                        <Typography variant='h4' className={classes.title}>
                            {title}
                        </Typography>
                    </motion.div>

                    <motion.div
                        initial={{ y: -50 }}
                        animate={{ y: 0 }}
                        exit={{ y: 50, opacity: 0 }}
                        transition={transition}
                    >
                        <IconButton
                            onClick={handleClick}
                            color='inherit'
                            edge='end'
                        >
                            <MoreVertIcon />
                        </IconButton>
                    </motion.div>
                </Grid>
                <Grid item xs={12}>
                    <motion.div
                        initial={{ y: 50 }}
                        animate={{ y: 0 }}
                        exit={{ y: 50, opacity: 0 }}
                        transition={transition}
                    >
                        {config.map(
                            ({
                                title: sectionTitle,
                                description,
                                component,
                            }) => (
                                <Accordion
                                    key={sectionTitle}
                                    expanded={expanded.has(sectionTitle)}
                                    onChange={handleChange(sectionTitle)}
                                    elevation={
                                        expanded.has(sectionTitle) ? 8 : 1
                                    }
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
                                    <AccordionDetails>
                                        {getDetails(component, sectionTitle)}
                                    </AccordionDetails>
                                </Accordion>
                            )
                        )}
                    </motion.div>
                </Grid>
            </Grid>
        </div>
    );
}
