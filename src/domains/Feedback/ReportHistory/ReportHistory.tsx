import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {
    Sort as SortIcon,
    Search as SearchIcon,
    ArrowDropDown as ArrowDownIcon,
} from '@material-ui/icons';
import Pagination from '@material-ui/lab/Pagination';

import useEndpoint from 'hooks/useEndpoint';
import Loader from 'components/Loader';
import LoadingButton from 'components/LoadingButton';
import ReportList from 'domains/Feedback/ReportList';
import ReportStateContext from '../Contexts/ReportStateContext';
import {
    getFeedbackReportsBySubmitter,
    getBugReportsBySubmitter,
} from '../api';

import { FeedbackReport, BugReport } from '../types';

const ReportOptions = ['Feedback', 'Bug'];

const sortingOptions = [
    { name: 'Ascending', value: 'true' },
    { name: 'Descending', value: 'false' },
];

type Report = FeedbackReport | BugReport;

// TODO: auth
const user = {
    _id: '123456789',
};

const pageSize = 10;

const useStyles = makeStyles((theme: Theme) => ({
    select: {
        borderColor: theme.palette.common.white,
        color: theme.palette.common.white,
    },
}));

export default function ReportHistory() {
    const classes = useStyles();
    const [prevReportType, setPrevReportType] = React.useState('');
    const [reportType, setReportType] = React.useState('');
    const [sortingOrder, setSortingOrder] = React.useState('');
    const [page, setPage] = React.useState(1);
    const [numOfPages, setNumOfPages] = React.useState(0);
    const [reports, setReports] = React.useState<Report[]>([]);

    const handleReportChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        setReportType(e.target.value as string);
    };

    const handleSortingChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        setSortingOrder(e.target.value as string);
    };

    const feedbackReportsAPIrequest = React.useCallback(
        () =>
            // TODO: Replace with user Id
            getFeedbackReportsBySubmitter(page, sortingOrder, user._id),
        [page, sortingOrder]
    );

    const bugReportsAPIrequest = React.useCallback(
        // TODO: Replace with user Id
        () => getBugReportsBySubmitter(page, sortingOrder, user._id),
        [page, sortingOrder]
    );

    const [sendFeedbackRequest, isLoadingFeedback] = useEndpoint(
        feedbackReportsAPIrequest,
        {
            onSuccess: (results) => {
                // Adds type attribute to report objects. This will be needed in children components
                const feedbackReports = results.data.reports.map((report) => ({
                    ...report,
                    type: 'Feedback',
                })) as Report[];
                setNumOfPages(results.data.count / pageSize);
                setReports(feedbackReports);
            },
        }
    );

    const [sendBugRequest, isLoadingBug] = useEndpoint(bugReportsAPIrequest, {
        onSuccess: (results) => {
            const bugReports = results.data.reports.map((report) => ({
                ...report,
                type: 'Bug',
            })) as Report[];
            setNumOfPages(results.data.count / pageSize);
            setReports(bugReports);
        },
    });

    const sendRequest = () => {
        // Clean reports from state of component
        setReports([]);
        // If the report type selected has changed then set the page number to 1
        if (prevReportType !== reportType) {
            setPage(1);
        }
        // save the report Type just selected
        setPrevReportType(reportType);

        // Decide which type of request to send
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
        setPage(value);
        sendRequest();
    };

    const getReports = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendRequest();
    };

    const findReport = (reportsToIterate: Report[], report: Report) => {
        return reportsToIterate.findIndex((rp) => rp._id === report._id);
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
        refetchReports: () => sendRequest(),
    };

    return (
        <div>
            <AppBar position='sticky'>
                <Toolbar>
                    <form onSubmit={getReports}>
                        <Grid container alignItems='center' spacing={3}>
                            <Grid item>
                                <FormControl>
                                    <Select
                                        className={classes.select}
                                        id='reportSelector'
                                        displayEmpty
                                        required
                                        value={reportType}
                                        onChange={handleReportChange}
                                        input={<Input />}
                                        IconComponent={() => <ArrowDownIcon />}
                                    >
                                        <MenuItem disabled value=''>
                                            Report Type
                                        </MenuItem>

                                        {ReportOptions.map((ReportOption) => (
                                            <MenuItem
                                                key={ReportOption}
                                                value={ReportOption}
                                            >
                                                {ReportOption}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl>
                                    <Select
                                        id='sortingSelector'
                                        className={classes.select}
                                        displayEmpty
                                        required
                                        value={sortingOrder}
                                        onChange={handleSortingChange}
                                        input={<Input />}
                                        IconComponent={() => <SortIcon />}
                                    >
                                        <MenuItem disabled value=''>
                                            Sorting Order
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
                                >
                                    <Button
                                        type='submit'
                                        color='inherit'
                                        endIcon={<SearchIcon />}
                                    >
                                        Search
                                    </Button>
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </form>
                </Toolbar>
            </AppBar>

            {/* TODO: FIX - Loader is rendering at some weird position, is it because of the absolute attribute?  */}
            <Grid container item justify='center' alignItems='center' xs={12}>
                {isLoadingFeedback || isLoadingBug ? (
                    <Loader />
                ) : (
                    <ReportStateContext.Provider value={customReportFunctions}>
                        <ReportList reports={reports} />
                    </ReportStateContext.Provider>
                )}
            </Grid>

            {/* When infinite scrolling is complete, this pagination seciton can be removed since it is suboptimal */}
            {reports.length !== 0 && (
                <Grid
                    container
                    item
                    justify='center'
                    alignItems='center'
                    xs={12}
                >
                    <Pagination
                        siblingCount={0}
                        color='primary'
                        count={numOfPages}
                        page={page}
                        onChange={handlePageChange}
                    />
                </Grid>
            )}
        </div>
    );
}
