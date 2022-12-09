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

interface VoteResponseChartProps {
    votes: {
        for: number;
        against: number;
        conflicted: number;
    };
}

export function VoteResponseChart({ votes }: VoteResponseChartProps) {
    return (
        <React.Fragment>
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
            {/* Chart selection here */}
        </React.Fragment>
    );
}
