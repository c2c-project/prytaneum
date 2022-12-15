import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import * as React from 'react';
import Chart from 'react-google-charts';

// Color association based on the vote value
const getVoteColor = (vote: 'FOR' | 'AGAINST' | 'CONFLICTED') => {
    switch (vote) {
        case 'FOR':
            return 'green';
        case 'AGAINST':
            return 'red';
        case 'CONFLICTED':
            return 'orange';
        default:
            return 'black';
    }
};

type ChartType = 'PieChart' | 'BarChart' | 'StakedBarChart';

interface DisplayChartProps {
    chartType: ChartType;
    votes: VoteResponseChartProps['votes'];
}

const DisplayChart = ({ chartType, votes }: DisplayChartProps) => {
    switch (chartType) {
        case 'PieChart':
            return (
                <Chart
                    chartType='PieChart'
                    data={[
                        ['Vote', 'Count'],
                        ['For', votes.for],
                        ['Against', votes.against],
                        ['Conflicted', votes.conflicted],
                    ]}
                    options={{
                        title: 'Votes',
                        slices: {
                            0: { color: getVoteColor('FOR') },
                            1: { color: getVoteColor('AGAINST') },
                            2: { color: getVoteColor('CONFLICTED') },
                        },
                    }}
                    width='100%'
                    height='400px'
                />
            );
        case 'BarChart':
            return (
                <Chart
                    chartType='BarChart'
                    data={[
                        [
                            'Vote',
                            'Count',
                            { role: 'style' },
                            { sourceColumn: 0, role: 'annotation', type: 'string', calc: 'stringify' },
                        ],
                        ['For', votes.for, getVoteColor('FOR'), null],
                        ['Against', votes.against, getVoteColor('AGAINST'), null],
                        ['Conflicted', votes.conflicted, getVoteColor('CONFLICTED'), null],
                    ]}
                    options={{
                        title: 'Feedback Prompt Votes',
                        bar: { groupWidth: '95%' },
                        legend: { position: 'none' },
                        hAxis: {
                            title: 'Votes',
                            minValue: 0,
                            maxValue: Math.max(votes.for, votes.against, votes.conflicted),
                        },
                    }}
                    width='100%'
                    height='400px'
                />
            );
        case 'StakedBarChart':
            return (
                <Chart
                    chartType='BarChart'
                    data={[
                        ['Votes', 'For', 'Against', 'Conflicted'],
                        ['Votes', votes.for, votes.against, votes.conflicted],
                    ]}
                    options={{
                        title: 'Feedback Prompt Votes',
                        chartArea: { width: '65%' },
                        isStacked: true,
                        bar: { groupWidth: '85%' },
                        legend: { position: 'top' },
                        series: {
                            0: { color: getVoteColor('FOR') },
                            1: { color: getVoteColor('AGAINST') },
                            2: { color: getVoteColor('CONFLICTED') },
                        },
                    }}
                    width='100%'
                    height='400px'
                />
            );
        default:
            return <></>;
    }
};

interface VoteResponseChartProps {
    votes: {
        for: number;
        against: number;
        conflicted: number;
    };
}

export function VoteResponseChart({ votes }: VoteResponseChartProps) {
    const [chartType, setChartType] = React.useState<ChartType>('BarChart');

    const handleSelectionChange = (e: SelectChangeEvent<ChartType>) => {
        e.preventDefault();
        setChartType(e.target.value as ChartType);
    };

    return (
        <React.Fragment>
            <FormControl>
                <InputLabel id='lang-label'>Chart Type</InputLabel>
                <Select
                    labelId='lang-label'
                    id='lang'
                    label='Language'
                    name='lang'
                    value={chartType}
                    onChange={handleSelectionChange}
                >
                    <MenuItem value='BarChart'>Bar Chart</MenuItem>
                    <MenuItem value='PieChart'>Pie Chart</MenuItem>
                    <MenuItem value='StakedBarChart'>Staked Bar Chart</MenuItem>
                </Select>
            </FormControl>
            <DisplayChart chartType={chartType} votes={votes} />
        </React.Fragment>
    );
}
