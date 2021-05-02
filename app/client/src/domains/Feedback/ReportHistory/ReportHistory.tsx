import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Pagination from '@material-ui/lab/Pagination';
import { isToday, isThisWeek, isThisMonth, isThisYear } from 'date-fns';

import Form from '@local/components/Form';
import Select from '@local/components/Select';
import useEndpoint from '@local/hooks/useEndpoint';
import Loader from '@local/components/Loader';
import ListFilter from '@local/components/ListFilter';
import useFilters, { Accessors } from '@local/components/ListFilter/useFilters';
import LoadingButton from '@local/components/LoadingButton';
import ReportList from '@local/domains/Feedback/ReportList';
import { FilterFunc } from '@local/utils/filters';
import ReportStateContext from '../Contexts/ReportStateContext';
import { getFeedbackReportsBySubmitter, getBugReportsBySubmitter } from '../api';
import { Report, ReportTypes } from '../types';

const reportOptions = ['Feedback', 'Bug'];
const sortingOrderOptions = ['Ascending', 'Descending'];
type sortingOrderTypes = 'Ascending' | 'Descending';
const pageSize = 10;
const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        height: '100%',
    },
}));

export default function ReportHistory() {
    const classes = useStyles();
    const [prevReportType, setPrevReportType] = React.useState('');
    const [reportType, setReportType] = React.useState<ReportTypes>('Feedback');
    const [sortingOrder, setSortingOrder] = React.useState<sortingOrderTypes>('Ascending');
    const [page, setPage] = React.useState(1);
    const [numOfPages, setNumOfPages] = React.useState(0);
    const [reports, setReports] = React.useState<Report[]>([]);
    const accessors = React.useMemo<Accessors<Report>[]>(() => [(report) => report.description], []);
    const [filteredReports, handleSearch, handleFilterChange] = useFilters(reports, accessors);

    const feedbackReportsAPIRequest = React.useCallback(() => getFeedbackReportsBySubmitter(page, sortingOrder), [
        page,
        sortingOrder,
    ]);

    const bugReportsAPIRequest = React.useCallback(() => getBugReportsBySubmitter(page, sortingOrder), [
        page,
        sortingOrder,
    ]);

    const [sendFeedbackRequest, isLoadingFeedback] = useEndpoint(feedbackReportsAPIRequest, {
        onSuccess: (results) => {
            const feedbackReports = results.data.reports.map((report) => ({
                ...report,
                type: 'Feedback',
            }));
            setNumOfPages(results.data.count / pageSize);
            setReports(feedbackReports as Report[]);
        },
    });

    const [sendBugRequest, isLoadingBug] = useEndpoint(bugReportsAPIRequest, {
        onSuccess: (results) => {
            const bugReports = results.data.reports.map((report) => ({
                ...report,
                type: 'Bug',
            }));
            setNumOfPages(results.data.count / pageSize);
            setReports(bugReports as Report[]);
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

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        sendRequest();
    };

    const getReports = (e: React.FormEvent<HTMLFormElement>) => {
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

    type Filter = FilterFunc<Report>;
    const filterMap: Record<string, Filter> = {
        Today: (data) => data.filter(({ meta: { createdAt } }) => isToday(new Date(createdAt))),

        'This week': (data) => data.filter(({ meta: { createdAt } }) => isThisWeek(new Date(createdAt))),

        'This month': (data) => data.filter(({ meta: { createdAt } }) => isThisMonth(new Date(createdAt))),

        'This year': (data) => data.filter(({ meta: { createdAt } }) => isThisYear(new Date(createdAt))),
    };

    return (
        <div className={classes.root}>
            <Form onSubmit={getReports}>
                <Grid container alignItems='center' spacing={3}>
                    <Grid item xs={12} md={2}>
                        <Select
                            label='Report Type'
                            options={reportOptions}
                            id='report-type-select'
                            required
                            value={reportType}
                            onChange={(e) => {
                                const { value } = e.target;
                                setReportType(value as ReportTypes);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Select
                            label='Sorting Order'
                            options={sortingOrderOptions}
                            id='sorting-order-select'
                            required
                            value={sortingOrder}
                            onChange={(e) => {
                                const { value } = e.target;
                                setSortingOrder(value as sortingOrderTypes);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <LoadingButton loading={isLoadingFeedback || isLoadingBug}>
                            <Button type='submit' color='inherit' variant='contained'>
                                Search
                            </Button>
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Form>
            <Grid container item justify='center' alignItems='center' xs={12}>
                <Grid item xs={12}>
                    <ListFilter
                        onSearch={handleSearch}
                        length={filteredReports.length}
                        filterMap={filterMap}
                        onFilterChange={handleFilterChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    {isLoadingFeedback || isLoadingBug ? (
                        <Loader />
                    ) : (
                        <ReportStateContext.Provider value={customReportFunctions}>
                            <ReportList reports={filteredReports} />
                        </ReportStateContext.Provider>
                    )}
                </Grid>
            </Grid>
            {/* When infinite scrolling is complete, this pagination section can be removed since it is suboptimal */}
            {reports.length !== 0 && (
                <Grid container item justify='center' alignItems='center' xs={12}>
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
