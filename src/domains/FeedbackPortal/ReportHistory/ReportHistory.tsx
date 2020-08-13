import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Sort as SortIcon, Search as SearchIcon } from '@material-ui/icons';

//  TODO: replace values with API function to call
const ReportOptions = [
    {
        name: 'Feedback',
        value: '/api/feedback/get-reports',
    },
    {
        name: 'Bug',
        value: '/api/bug/get-reports',
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

export default function ReportHistory({}) {
    const classes = useStyles();
    const [getReportEndpoints, setGetReportEndpoints] = React.useState([]);
    const [sortingOrder, setSortingOrder] = React.useState('');

    const handleReportChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        setGetReportEndpoints(e.target.value as []);
    };

    const handleSortingChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        setSortingOrder(e.target.value as string);
    };

    const getReports = () => {
        // TODO: Call all API functions in the array getReportEndpoints
        console.log('Getting Reports');
    };

    return (
        <Grid container spacing={5}>
            <Grid container item spacing={5} direction='row'>
                <Grid item>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Report Type</InputLabel>
                        <Select
                            multiple
                            value={getReportEndpoints}
                            onChange={handleReportChange}
                            input={<Input />}
                        >
                            {ReportOptions.map((ReportOption) => (
                                <MenuItem
                                    key={ReportOption.name}
                                    value={ReportOption.value}
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
                    <IconButton
                        color='primary'
                        component='span'
                        onClick={getReports}
                    >
                        <SearchIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid item>
                <div>
                    <h1>Report Value Selected:</h1>
                    {getReportEndpoints.map((getReportEndpoint) => (
                        <h3>{getReportEndpoint}</h3>
                    ))}
                </div>
                <div>
                    <h1>Sorting Value Selected:</h1>
                    <h2>{sortingOrder}</h2>
                </div>
            </Grid>
        </Grid>
    );
}
