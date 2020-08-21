import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    Divider,
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Dialog from 'components/Dialog';
import ReportSummary from 'domains/FeedbackPortal/ReportSummary';
import { formatDate } from 'utils/format';
import { ReportObject } from '../api';

interface Props {
    ReportObjects: ReportObject[];
}

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        height: '100%',
    },
    li: {
        padding: 10,
    },
    FontSize: {
        fontSize: 20,
    },
}));

// TODO: Make this component receive the update and delete functions to call as callback functions
export default function ReportList({ ReportObjects }: Props) {
    const classes = useStyles();
    const [reportObjectSelected, setReportObjectSelected] = React.useState<
        ReportObject
    >({});
    const [open, setOpen] = React.useState(false);

    const selectReport = (reportObject: ReportObject) => {
        setReportObjectSelected(reportObject);
        setOpen(true);
    };

    return (
        <div>
            <List className={classes.root} subheader={<li />}>
                {ReportObjects.map((reportObject) => (
                    <li key={reportObject.Report._id}>
                        <Divider />
                        <ListSubheader
                            className={classes.FontSize}
                            color='primary'
                        >
                            {`Date Submitted: ${formatDate(
                                new Date(reportObject.Report.date)
                            )}`}
                        </ListSubheader>
                        <ListItem
                            button
                            onClick={() => {
                                selectReport(reportObject);
                            }}
                        >
                            <ListItemText
                                primary={`${reportObject.Report.description.substr(
                                    0,
                                    200
                                )} ...`}
                            />
                        </ListItem>
                    </li>
                ))}
            </List>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <Container maxWidth='sm' style={{ padding: 20 }}>
                    <ReportSummary ReportObject={reportObjectSelected} />
                </Container>
            </Dialog>
        </div>
    );
}
