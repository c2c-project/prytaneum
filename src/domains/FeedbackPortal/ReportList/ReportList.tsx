import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    ListItemSecondaryAction,
    Divider,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { red, blue } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import {
    Delete as DeleteIcon,
    ArrowForward as ArrowForwardIcon,
} from '@material-ui/icons';

import { formatDate } from 'utils/format';
import { Report } from '../api';

interface Props {
    Reports: Report[];
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        height: '100%',
    },
    PrimaryButton: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
        '&:hover': {
            backgroundColor: blue[700],
        },
    },
    DangerButton: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[700],
        },
    },
}));

// TODO: Make this component receive the update and delete functions to call as callback functions
export default function ReportList({ Reports }: Props) {
    const classes = useStyles();
    return (
        <List className={classes.root}>
            {Reports.map((report) => (
                <div>
                    <ListSubheader color='primary'>
                        {formatDate(new Date(report.date))}
                    </ListSubheader>
                    <Divider />
                    <ListItem divider>
                        <ListItemText
                            primary={report.description.substr(0, 200) + '...'}
                        />
                        <ListItemSecondaryAction>
                            <IconButton className={classes.PrimaryButton}>
                                <ArrowForwardIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                        <ListItemSecondaryAction>
                            <IconButton className={classes.DangerButton}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </div>
            ))}
        </List>
    );
}
