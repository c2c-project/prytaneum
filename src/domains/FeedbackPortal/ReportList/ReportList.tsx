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
import { ReportObject } from '../types';

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

export default function ReportList({ ReportObjects }: Props) {
    const classes = useStyles();
    const [
        reportObjectSelected,
        setReportObjectSelected,
    ] = React.useState<ReportObject | null>(null);
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
                                setReportObjectSelected(reportObject);
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
            <Dialog
                open={Boolean(reportObjectSelected)}
                onClose={() => setReportObjectSelected(null)}
            >
                {reportObjectSelected ? (
                    <Container maxWidth='sm' style={{ padding: 20 }}>
                        <ReportSummary
                            ReportObject={reportObjectSelected}
                            callBack={() => {
                                setReportObjectSelected(null);
                            }}
                        />
                    </Container>
                ) : (
                    <></>
                )}
            </Dialog>
        </div>
    );
}
