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
import {
    getFeedbackReportsBySubmitter,
    getBugReportsBySubmitter,
    updateBugReport,
    updateFeedbackReport,
    deleteBugReport,
    deleteFeedbackReport,
} from '../api';

import { ReportObject, FeedbackForm, BugReportForm } from '../types';

//  TODO: replace values with API function to call
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

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value);
    };

    const handleReportChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        setReportEndpoints(e.target.value as []);
    };

    const handleSortingChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        setSortingOrder(e.target.value as string);
    };

    const [sendFeedbackRequest, isLoadingFeedback] = useEndpoint(
        ApiRequests.Feedback,
        {
            onSuccess: (results) => {
                // Creates Report objects with a report, update, and delete functions
                const feedbackReportObjects = results.data.reports.map(
                    (report) => ({
                        Report: report,
                        update: (form: FeedbackForm) =>
                            updateFeedbackReport(form),
                        delete: (_id: string) => deleteFeedbackReport(_id),
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
            const bugReportObjects = results.data.reports.map((report) => ({
                Report: report,
                update: (form: BugReportForm) => updateBugReport(form),
                delete: (_id: string) => deleteBugReport(_id),
            }));

            setReportObjects((prevReports) => [
                ...prevReports,
                ...bugReportObjects,
            ]);
        },
    });

    const getReports = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (ReportEndpoints.includes('Feedback')) {
            sendFeedbackRequest();
        }
        if (ReportEndpoints.includes('Bug')) {
            sendBugRequest();
        }
    };

    return (
        <div>
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <form onSubmit={getReports}>
                        <Grid container spacing={5}>
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
            <Grid justify='center' item xs={12}>
                <ReportList ReportObjects={reportObjects} />
                {/* <div>
                    <h1>Report Value Selected:</h1>
                    {getReportEndpoints.map((getReportEndpoint) => (
                        <h3>{getReportEndpoint}</h3>
                    ))}
                </div>
                <div>
                    <h1>Sorting Value Selected:</h1>
                    <h2>{sortingOrder}</h2>
                </div>
                <div>
                    <h1>Page Selected:</h1>
                    <h1>{page}</h1>
                </div> */}
            </Grid>
            <Grid item container justify='center' xs={12}>
                <Pagination
                    color='primary'
                    count={10}
                    page={page}
                    onChange={handlePageChange}
                />
            </Grid>
        </div>
    );
}
