import React from 'react';
import PropTypes from 'prop-types';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const ReportOptions = ['Feedback', 'Bug'];
const sortingOptions = [
    { name: 'Ascending', value: 'true' },
    { name: 'Descending', value: 'false' },
];

export default function ReportHistory({}) {
    const [reportType, setReportType] = React.useState([]);
    const [sortingOrder, setSortingOrder] = React.useState('');

    const handleReportChange = (e) => {
        setReportType(e.target.value);
    };

    const handleSortingChange = (e) => {
        setSortingOrder(e.target.value);
    };

    return (
        <div>
            <FormControl>
                <InputLabel>Report Type</InputLabel>
                <Select
                    multiple
                    value={reportType}
                    onChange={handleReportChange}
                    input={<Input />}
                >
                    {ReportOptions.map((ReportOption) => (
                        <MenuItem key={ReportOption} value={ReportOption}>
                            {ReportOption}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl>
                <InputLabel>Sorting Order</InputLabel>
                <Select
                    value={sortingOrder}
                    onChange={handleSortingChange}
                    input={<Input />}
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

            <p>
                <h1>Report Types Selected:</h1>
                {reportType.map((rt) => (
                    <h2>{rt}</h2>
                ))}
            </p>
            <p>
                <h1>Sorting Type Selected:</h1>
                <h2>{sortingOrder}</h2>
            </p>
        </div>
    );
}
