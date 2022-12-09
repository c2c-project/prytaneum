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

interface DisplayChartProps {
    chartType: 'PieChart' | 'BarChart';
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
    const [chartType, setChartType] = React.useState<'PieChart' | 'BarChart'>('BarChart');

    return (
        <React.Fragment>
            <DisplayChart chartType={chartType} votes={votes} />
            {/* Chart selection here */}
        </React.Fragment>
    );
}
