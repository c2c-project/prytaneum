import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Sort as SortIcon, Search as SearchIcon } from '@material-ui/icons';
import Pagination from '@material-ui/lab/Pagination';

import useEndpoint from 'hooks/useEndpoint';
import LoadingButton from 'components/LoadingButton';
import ReportList from 'domains/FeedbackPortal/ReportList';
import ReportContext from '../Contexts/ReportContext';
import {
    getFeedbackReportsBySubmitter,
    getBugReportsBySubmitter,
    updateBugReport,
    updateFeedbackReport,
    deleteBugReport,
    deleteFeedbackReport,
} from '../api';

import {
    ReportObject,
    FeedbackForm,
    BugReportForm,
    FeedbackReport,
    BugReport,
} from '../types';

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

// TODO: Pass submit and delete endpoint API functions using Context provider. Only let user get at one type of report at a time, either bug or feedback
// TODO: When the type of report is changed also reset the number of pages back to 1

export default function ReportHistory() {
    const classes = useStyles();
    const [ReportEndpoints, setReportEndpoints] = React.useState<string[]>([]);
    const [sortingOrder, setSortingOrder] = React.useState('');
    const [page, setPage] = React.useState(1);

    const [reportObjects, setReportObjects] = React.useState<ReportObject[]>(
        []
    );

    const ApiRequests = {
        Feedback: React.useCallback(
            () =>
                // TODO: Replace with user Id
                getFeedbackReportsBySubmitter(page, sortingOrder, '123456789'),
            [page, sortingOrder]
        ),
        Bug: React.useCallback(
            // TODO: Replace with user Id
            () => getBugReportsBySubmitter(page, sortingOrder, '123456789'),
            [page, sortingOrder]
        ),
    };

    const handleReportChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        // When type of report is changed also changed the submit and delete endpoints.
        setReportEndpoints(e.target.value as []);
    };

    const handleSortingChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        setSortingOrder(e.target.value as string);
    };

    const [sendFeedbackRequest, isLoadingFeedback] = useEndpoint(
        ApiRequests.Feedback,
        {
            onSuccess: (results) => {
                // Creates an object that contains a report object, update function, and delete function
                console.log(results);
                const feedbackReportObjects = results.data.reports.map(
                    (report) => ({
                        Report: report,
                        submitEndpoint: (form: FeedbackForm) =>
                            updateFeedbackReport(form),
                        deleteEndpoint: (_id: string) =>
                            deleteFeedbackReport(_id),
                    })
                );

                // Updates the state of reportObjects
                setReportObjects((prevReports) => [
                    ...prevReports,
                    ...feedbackReportObjects,
                ]);
            },
        }
    );

    const [sendBugRequest, isLoadingBug] = useEndpoint(ApiRequests.Bug, {
        onSuccess: (results) => {
            console.log(results);
            const bugReportObjects = results.data.reports.map((report) => ({
                Report: report,
                submitEndpoint: (form: BugReportForm) => updateBugReport(form),
                deleteEndpoint: (_id: string) => deleteBugReport(_id),
            }));

            setReportObjects((prevReports) => [
                ...prevReports,
                ...bugReportObjects,
            ]);
        },
    });

    const sendRequests = () => {
        // Clean reports from state of component
        setReportObjects([]);
        if (ReportEndpoints.includes('Feedback')) {
            sendFeedbackRequest();
        }
        if (ReportEndpoints.includes('Bug')) {
            sendBugRequest();
        }
    };

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        // Update the page number in the state of the component
        setPage(value);
        // Removes existing report objects from the state of the component
        setReportObjects([]);
        // Sends requests with an updated page query parameter
        sendRequests();
    };

    const getReports = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendRequests();
    };

    type Report = FeedbackReport | BugReport;

    const findReport = (reports: ReportObject[], report: Report) => {
        return reports.findIndex((rp) => rp.Report._id === report._id);
    };

    const deleteReport = (reportId: string) => {
        setReportObjects((prevReports) => {
            return prevReports.filter(
                (prevReport) => prevReport.Report._id !== reportId
            );
        });
    };

    const updateReport = (report: Report) => {
        const prevReports = [...reportObjects];
        const indexOfReport = findReport(prevReports, report);
        if (indexOfReport === -1) {
            return;
        }
        prevReports[indexOfReport].Report = report;

        setReportObjects(prevReports);
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
                                    <InputLabel>Report Type</InputLabel>
                                    <Select
                                        required
                                        multiple
                                        value={ReportEndpoints}
                                        onChange={handleReportChange}
                                        input={<Input />}
                                    >
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
                                    <InputLabel>Sorting Order</InputLabel>
                                    <Select
                                        required
                                        value={sortingOrder}
                                        onChange={handleSortingChange}
                                        input={<Input />}
                                        IconComponent={() => <SortIcon />}
                                    >
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
                                    loading={isLoadingFeedback && isLoadingBug}
                                    component={
                                        <Button
                                            fullWidth
                                            type='submit'
                                            color='primary'
                                        >
                                            <SearchIcon />
                                        </Button>
                                    }
                                />
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
            <ReportContext.Provider value={customReportFunctions}>
                <Grid
                    item
                    container
                    justify='center'
                    alignItems='center'
                    xs={12}
                >
                    <ReportList reportObjects={reportObjects} />
                </Grid>
            </ReportContext.Provider>
            {reportObjects.length !== 0 && (
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
