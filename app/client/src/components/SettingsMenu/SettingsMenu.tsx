import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Typography,
    Grid,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    IconButton,
    Menu,
    MenuItem,
    ListItemText,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVert from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
    },
    container: {
        padding: theme.spacing(2, 1, 2, 2),
        justifyContent: 'space-between'
    },
    panel: {
        boxShadow: '0 5px 10px 0 rgba(0, 0, 0, .3)',
    },
    componentTitle: {
        margin: theme.spacing(0, 0, 2, 0),
    },
    componentDivider: {
        marginTop: theme.spacing(2),
    },
    heading: {
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        color: theme.palette.text.secondary,
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
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const isOpen = React.useMemo(() => Boolean(anchorEl), [anchorEl]);
    const width = React.useRef(0);
    const [numExpanded, setNumExpanded] = React.useState(0);
    const [expandedPanels, setExpandedPanels] = React.useState<any[]>([])

    const handleChange = (panel: any) => (event: any, isExpanded: any) => {
        setNumExpanded(isExpanded ? numExpanded + 1 : numExpanded - 1);

        if (isExpanded)
            setExpandedPanels(oldArray => [...oldArray, panel]);
        else 
            setExpandedPanels(expandedPanels.filter(item => item !== panel));
    };

    const handleExpandAll = () => {
        setNumExpanded(config.length);
        setExpandedPanels(config.map(x => Object.values(x)[0]));
    };

    const handleCollapseAll = () => {
        setNumExpanded(0);
        setExpandedPanels([]);
    };

    function handleOpen(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const { currentTarget } = e;
        width.current = currentTarget.clientWidth;
        setAnchorEl(currentTarget);
    }

    return (
        <div className={classes.root}>
            <Grid container className={classes.container}>
                <Grid item>
                    <Typography variant='h4'>User Settings</Typography>
                </Grid>
                <Grid item>
                    <IconButton onClick={handleOpen}>
                        <MoreVert />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={isOpen}
                        onClose={() => setAnchorEl(null)}
                        onClick={() => setAnchorEl(null)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        getContentAnchorEl={null}
                        PaperProps={{
                            style: { minWidth: width.current },
                        }}
                    >
                        {numExpanded === 0 && 
                            <MenuItem button>
                                <ListItemText primary='Expand All' onClick={() => handleExpandAll()} />
                            </MenuItem>
                        }
                        {numExpanded !== 0 && 
                            <MenuItem button >
                                <ListItemText primary='Collapse All' onClick={() => handleCollapseAll()} />
                            </MenuItem>
                        }
                    </Menu>
                </Grid>
            </Grid>
            <div>
                {config.map(
                    ({ title: sectionTitle, description, component }, idx) =>
                        component && (
                            <Accordion 
                                expanded={expandedPanels.includes(sectionTitle)} 
                                onChange={handleChange(sectionTitle)}
                                className={expandedPanels.includes(sectionTitle) && classes.panel || undefined}
                            >
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant='body2' className={classes.heading}>{sectionTitle}</Typography>
                                    <Typography variant='body2' className={classes.secondaryHeading}>{description}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container key={sectionTitle}>
                                        {/* <Grid item xs={12} className={classes.componentTitle}>
                                            <Typography variant='h5'>{sectionTitle}</Typography>
                                            <Typography variant='body2' color='textSecondary'>
                                                {description}
                                            </Typography>
                                        </Grid> */}
                                        <Grid item xs={12}>
                                            {component}
                                        </Grid>
                                        {/* {idx !== config.length - 1 && (
                                            <Grid item xs={12}>
                                                <Divider className={classes.componentDivider} />
                                            </Grid>
                                        )} */}
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        )
                )}
            </div>
        </div>
    );
}
