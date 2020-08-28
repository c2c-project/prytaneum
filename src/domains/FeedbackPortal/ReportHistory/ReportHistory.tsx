import React from 'react';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Sort as SortIcon, Search as SearchIcon } from '@material-ui/icons';
import Pagination from '@material-ui/lab/Pagination';

import useEndpoint from 'hooks/useEndpoint';
import Loader from 'components/Loader';
import LoadingButton from 'components/LoadingButton';
import ReportList from 'domains/FeedbackPortal/ReportList';
import ReportStateContext from '../Contexts/ReportStateContext';
import {
    getFeedbackReportsBySubmitter,
    getBugReportsBySubmitter,
} from '../api';

import { FeedbackReport, BugReport } from '../types';

const ReportOptions = [
    {
        name: 'Feedback',
    },
    {
        name: 'Bug',
    },
];

const sortingOptions = [
    { name: 'Ascending', value: 'true' },
    { name: 'Descending', value: 'false' },
];

const useStyles = makeStyles(() =>
    createStyles({
        formControl: {
            minWidth: 150,
            maxWidth: 350,
        },
    })
);

// TODO: When the type of report is changed and the search button is pressed, also reset the number of pages back to 1
type Report = FeedbackReport | BugReport;

export default function ReportHistory() {
    const classes = useStyles();
    const [prevReportType, setPrevReportType] = React.useState('');
    const [reportType, setReportType] = React.useState('');
    const [sortingOrder, setSortingOrder] = React.useState('');
    const [page, setPage] = React.useState(1);

    const [reports, setReports] = React.useState<Report[]>([]);

    const handleReportChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        setReportType(e.target.value as string);
    };

    const handleSortingChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        setPrevReportType(reportType);
        setSortingOrder(e.target.value as string);
    };

    const feedbackReportsAPIrequest = React.useCallback(
        () =>
            // TODO: Replace with user Id
            getFeedbackReportsBySubmitter(page, sortingOrder, '123456789'),
        [page, sortingOrder]
    );

    const bugReportsAPIrequest = React.useCallback(
        // TODO: Replace with user Id
        () => getBugReportsBySubmitter(page, sortingOrder, '123456789'),
        [page, sortingOrder]
    );

    const [sendFeedbackRequest, isLoadingFeedback] = useEndpoint(
        feedbackReportsAPIrequest,
        {
            onSuccess: (results) => {
                // Adds type attribute to report objects. This will be needed in children components
                const feedbackReports = results.data.reports.map((report) => ({
                    ...report,
                    type: 'feedback',
                }));
                setReports(feedbackReports);
            },
        }
    );

    const [sendBugRequest, isLoadingBug] = useEndpoint(bugReportsAPIrequest, {
        onSuccess: (results) => {
            const bugReports = results.data.reports.map((report) => ({
                ...report,
                type: 'Bug',
            }));
            setReports(bugReports);
        },
    });

    const sendRequest = () => {
        // Clean reports from state of component
        setReports([]);
        switch (reportType) {
            case 'Feedback':
                sendFeedbackRequest();
                break;
            case 'Bug':
                sendBugRequest();
                break;
            default:
                sendFeedbackRequest();
                break;
        }
    };

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        // Update the page number in the state of the component
        setPage(value);
        // Sends requests with an updated page query parameter
        sendRequest();
    };

    const getReports = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        // If the report type selected has changed then set the page number to 1
        if (prevReportType !== reportType) {
            setPage(1);
        }
        sendRequest();
    };

    const findReport = (reportsToIterate: Report[], report: Report) => {
        return reportsToIterate.findIndex((rp) => rp._id === report._id);
    };

    const deleteReport = (reportId: string) => {
        setReports((prevReports) => {
            return prevReports.filter(
                (prevReport) => prevReport._id !== reportId
            );
        });
    };

    const updateReport = (report: Report) => {
        const prevReports = [...reports];
        const indexOfReport = findReport(prevReports, report);
        if (indexOfReport === -1) {
            return;
        }
        prevReports[indexOfReport] = report;
        setReports(prevReports);
    };

    const customReportFunctions = {
        updateReport,
        deleteReport,
    };

    return (
        <div>
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <form onSubmit={getReports}>
                        {/*  Search button seems to be out of place but it's because the input fields enlarger */}
                        <Grid
                            container
                            direction='row'
                            spacing={5}
                            alignItems='center'
                        >
                            <Grid item>
                                <FormControl className={classes.formControl}>
                                    <Select
                                        displayEmpty
                                        required
                                        value={reportType}
                                        onChange={handleReportChange}
                                        input={<Input />}
                                    >
                                        <MenuItem disabled value=''>
                                            <em>Report Type</em>
                                        </MenuItem>
                                        {ReportOptions.map((ReportOption) => (
                                            <MenuItem
                                                key={ReportOption.name}
                                                value={ReportOption.name}
                                            >
                                                {ReportOption.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl className={classes.formControl}>
                                    <Select
                                        displayEmpty
                                        required
                                        value={sortingOrder}
                                        onChange={handleSortingChange}
                                        input={<Input />}
                                        IconComponent={() => <SortIcon />}
                                    >
                                        <MenuItem disabled value=''>
                                            <em>Sorting Order</em>
                                        </MenuItem>
                                        {sortingOptions.map((sortingOption) => (
                                            <MenuItem
                                                key={sortingOption.name}
                                                value={sortingOption.value}
                                            >
                                                {sortingOption.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <LoadingButton
                                    loading={isLoadingFeedback || isLoadingBug}
                                    component={
                                        <Button
                                            fullWidth
                                            type='submit'
                                            color='primary'
                                            endIcon={<SearchIcon />}
                                        >
                                            Search
                                        </Button>
                                    }
                                />
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
            {/*  Loader is rendering at some weird position, is it because of the absolute attribute?  */}
            <Grid item container justify='center' alignItems='center' xs={12}>
                {isLoadingFeedback || isLoadingBug ? (
                    <Loader />
                ) : (
                    <ReportStateContext.Provider value={customReportFunctions}>
                        <ReportList reports={reports} />
                    </ReportStateContext.Provider>
                )}
            </Grid>

            {reports.length !== 0 && (
                <Grid
                    item
                    container
                    justify='center'
                    alignItems='center'
                    xs={12}
                >
                    <Pagination
                        color='primary'
                        count={10}
                        page={page}
                        onChange={handlePageChange}
                    />
                </Grid>
            )}
        </div>
    );
}
