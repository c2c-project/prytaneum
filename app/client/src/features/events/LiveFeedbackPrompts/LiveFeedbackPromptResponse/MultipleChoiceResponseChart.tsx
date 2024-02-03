import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import * as React from 'react';
import Chart from 'react-google-charts';

type ChartType = 'PieChart' | 'BarChart' | 'StakedBarChart';

interface DisplayChartProps {
    chartType: ChartType;
    multipleChoiceOptions: MultipleChoiceResponseChartProps['multipleChoiceOptions'];
    responses: MultipleChoiceResponseChartProps['responses'];
}

const DisplayChart = ({ chartType, multipleChoiceOptions, responses }: DisplayChartProps) => {
    const optionResponseAmmounts = React.useMemo(() => {
        const _optionResponseAmmounts: number[] = [];
        multipleChoiceOptions.forEach((option) => {
            _optionResponseAmmounts.push(responses.filter((response) => response === option).length);
        });
        return _optionResponseAmmounts;
    }, [multipleChoiceOptions, responses]);

    switch (chartType) {
        case 'PieChart':
            return (
                <Chart
                    chartType='PieChart'
                    data={[
                        ['Vote', 'Count'],
                        ...multipleChoiceOptions.map((option, index) => [option, optionResponseAmmounts[index]]),
                    ]}
                    options={{
                        title: 'Votes',
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
                        ['Vote', 'Count', { sourceColumn: 0, role: 'annotation', type: 'string', calc: 'stringify' }],
                        ...multipleChoiceOptions.map((option, index) => [option, optionResponseAmmounts[index], null]),
                    ]}
                    options={{
                        title: 'Feedback Prompt Multiple Choice Votes',
                        bar: { groupWidth: '95%' },
                        legend: { position: 'none' },
                        hAxis: {
                            title: 'Votes',
                            minValue: 0,
                            maxValue: Math.max(...optionResponseAmmounts),
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
                        ['Votes', ...multipleChoiceOptions],
                        ['Votes', ...optionResponseAmmounts],
                    ]}
                    options={{
                        title: 'Feedback Prompt Multiple Choice Votes',
                        chartArea: { width: '65%' },
                        isStacked: true,
                        bar: { groupWidth: '85%' },
                        legend: { position: 'top' },
                    }}
                    width='100%'
                    height='400px'
                />
            );
        default:
            return <React.Fragment />;
    }
};

interface MultipleChoiceResponseChartProps {
    multipleChoiceOptions: string[];
    responses: string[];
}

export function MultipleChoiceResponseChart({ multipleChoiceOptions, responses }: MultipleChoiceResponseChartProps) {
    const [chartType, setChartType] = React.useState<ChartType>(
        (localStorage.getItem('chartType') as ChartType) || 'BarChart'
    );

    const handleSelectionChange = (e: SelectChangeEvent<ChartType>) => {
        e.preventDefault();
        const updatedChartType = e.target.value as ChartType;
        localStorage.setItem('chartType', updatedChartType);
        setChartType(updatedChartType);
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
            <DisplayChart chartType={chartType} multipleChoiceOptions={multipleChoiceOptions} responses={responses} />
        </React.Fragment>
    );
}
