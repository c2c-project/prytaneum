import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    Divider,
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Dialog from 'components/Dialog';
import ReportSummary from 'domains/FeedbackPortal/ReportSummary';
import { formatDate } from 'utils/format';
import ReportEndpointContext, {
    ReportEndpointHandlers,
    defaultEndpointHandlers,
} from '../Contexts/ReportEndpointContext';
import {
    FeedbackReport,
    BugReport,
    FeedbackForm,
    BugReportForm,
} from '../types';
import {
    deleteFeedbackReport,
    updateBugReport,
    deleteBugReport,
    updateFeedbackReport,
} from '../api';

type Report = FeedbackReport | BugReport;
interface Props {
    reports: Report[];
}

const useStyles = makeStyles((theme: Theme) => ({
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
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
        listStyle: 'none',
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

export default function ReportList({ reports }: Props) {
    const classes = useStyles();
    const [reportSelected, setReportSelected] = React.useState<Report | null>(
        null
    );

    const [endpoints, setEndpoints] = React.useState<ReportEndpointHandlers>(
        defaultEndpointHandlers
    );

    const endpointDict = {
        Feedback: {
            submitEndpoint: (form: FeedbackForm) => updateFeedbackReport(form),
            deleteEndpoint: (_id: string) => deleteFeedbackReport(_id),
        },
        Bug: {
            submitEndpoint: (form: BugReportForm) => updateBugReport(form),
            deleteEndpoint: (_id: string) => deleteBugReport(_id),
        },
    };

    const selectReport = (report: Report) => {
        setReportSelected(report);
        switch (report.type) {
            case 'Feedback':
                setEndpoints(endpointDict.Feedback);
                break;
            case 'Bug':
                setEndpoints(endpointDict.Bug);
                break;
            default:
                setEndpoints(endpointDict.Feedback);
                break;
        }
    };

    return (
        <div>
            <List className={classes.root}>
                {reports.map((report) => (
                    <li key={report._id} className={classes.listSection}>
                        <Divider />
                        <ListSubheader
                            disableSticky
                            className={classes.FontSize}
                            color='primary'
                        >
                            {`Date Submitted: ${formatDate(
                                new Date(report.date)
                            )}`}
                        </ListSubheader>
                        <ListItem
                            id={report._id}
                            button
                            onClick={() => {
                                selectReport(report);
                            }}
                        >
                            <ListItemText
                                primary={`${report.description.substr(
                                    0,
                                    200
                                )} ...`}
                            />
                        </ListItem>
                    </li>
                ))}
            </List>
            <Dialog
                open={Boolean(reportSelected)}
                onClose={() => setReportSelected(null)}
            >
                {reportSelected ? (
                    <Container maxWidth='sm' style={{ padding: 20 }}>
                        <ReportEndpointContext.Provider value={endpoints}>
                            <ReportSummary
                                report={reportSelected}
                                callBack={() => {
                                    setReportSelected(null);
                                    setEndpoints(defaultEndpointHandlers);
                                }}
                            />
                        </ReportEndpointContext.Provider>
                    </Container>
                ) : (
                    <></>
                )}
            </Dialog>
        </div>
    );
}
