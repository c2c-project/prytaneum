/* eslint import/no-unresolved: [2, { ignore: ['\.png$', '\.css$'] }] */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import question from '../assets/question.png';
import message from '../assets/message.png';
import time from '../assets/time.png';
import './Stats.css';

const barData = [
    {
        'Similar Questions': 'Topic1',
        Topic1: 28,
        Topic1Color: 'hsl(297, 70%, 50%)',
    },
    {
        'Similar Questions': 'Topic2',
        Topic2: 45,
        Topic2Color: 'hsl(68, 70%, 50%)',
    },
    {
        'Similar Questions': 'Topic3',
        Topic3: 87,
        Topic3Color: 'hsl(345, 70%, 50%)',
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    headerFont: {
        fontFamily: ['Montserrat'],
        fontSize: '20px',
    },
    contentFont: {
        fontFamily: ['Montserrat'],
        fontSize: '30px',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.Primary,
        height: '500px',
        width: '580px',
    },
    paperSpacing: {
        padding: '20px',
    },
    barWrapper: {
        height: '400px',
    },
}));

function Stats({ sent, asked, unanswered, duration, speaker }, tdata) {
    const classes = useStyles();

    const data = [
        {
            id: 'Questions Asked',
            label: 'Questions Asked',
            value: asked,
            color: 'hsl(201, 70%, 50%)',
        },
        {
            id: 'Unasked Questions',
            label: 'Unasked Questions',
            value: unanswered,
            color: 'hsl(195, 70%, 50%)',
        },
    ];

    return (
        <div>
            <Typography className={classes.headerFont}>
                Speaker: {speaker}
            </Typography>
            <Grid container spacing={2}>
                {console.log(tdata)}
                <Grid item xs={4}>
                    <Paper className={classes.paperSpacing} elevation={3}>
                        <Grid justify='space-between' container spacing={2}>
                            <Grid>
                                <img src={time} />
                            </Grid>
                            <Grid>
                                <Typography className={classes.headerFont}>
                                    Duration
                                </Typography>
                                <Typography className={classes.contentFont}>
                                    {duration}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paperSpacing} elevation={3}>
                        <Grid justify='space-between' container spacing={2}>
                            <Grid>
                                <img src={message} />
                            </Grid>
                            <Grid>
                                <Typography className={classes.headerFont}>
                                    Messages
                                </Typography>
                                <Typography className={classes.contentFont}>
                                    {sent}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paperSpacing} elevation={3}>
                        <Grid justify='space-between' container spacing={2}>
                            <Grid>
                                <img src={question} />
                            </Grid>
                            <Grid>
                                <Typography className={classes.headerFont}>
                                    Questions
                                </Typography>
                                <Typography className={classes.contentFont}>
                                    {asked}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid
                    container
                    spacing={8}
                    direction='row'
                    justify='center'
                    alignItems='center'
                >
                    <Grid item xs={4}>
                        <Paper className={classes.paper} elevation={3}>
                            <Typography
                                className={classes.headerFont}
                                align='left'
                            >
                                Questions Asked
                            </Typography>
                            <Grid className={classes.barWrapper}>
                                <ResponsivePie
                                    data={data}
                                    margin={{
                                        top: 40,
                                        right: 80,
                                        bottom: 80,
                                        left: 80,
                                    }}
                                    innerRadius={0.5}
                                    padAngle={0.7}
                                    cornerRadius={3}
                                    colors={{ scheme: 'nivo' }}
                                    borderWidth={1}
                                    borderColor={{
                                        from: 'color',
                                        modifiers: [['darker', 0.2]],
                                    }}
                                    radialLabelsSkipAngle={10}
                                    radialLabelsTextXOffset={6}
                                    radialLabelsTextColor='#333333'
                                    radialLabelsLinkOffset={0}
                                    radialLabelsLinkDiagonalLength={16}
                                    radialLabelsLinkHorizontalLength={24}
                                    radialLabelsLinkStrokeWidth={1}
                                    radialLabelsLinkColor={{ from: 'color' }}
                                    slicesLabelsSkipAngle={10}
                                    slicesLabelsTextColor='#333333'
                                    animate={true}
                                    motionStiffness={90}
                                    motionDamping={15}
                                    defs={[
                                        {
                                            id: 'dots',
                                            type: 'patternDots',
                                            background: 'inherit',
                                            color: 'rgba(255, 255, 255, 0.3)',
                                            size: 4,
                                            padding: 1,
                                            stagger: true,
                                        },
                                        {
                                            id: 'lines',
                                            type: 'patternLines',
                                            background: 'inherit',
                                            color: 'rgba(255, 255, 255, 0.3)',
                                            rotation: -45,
                                            lineWidth: 6,
                                            spacing: 10,
                                        },
                                    ]}
                                    legends={[
                                        {
                                            anchor: 'bottom',
                                            direction: 'row',
                                            translateY: 56,
                                            itemWidth: 140,
                                            itemHeight: 18,
                                            itemTextColor: '#999',
                                            symbolSize: 18,
                                            symbolShape: 'circle',
                                            effects: [
                                                {
                                                    on: 'hover',
                                                    style: {
                                                        itemTextColor: '#000',
                                                    },
                                                },
                                            ],
                                        },
                                    ]}
                                />
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.paper} elevation={3}>
                            <Typography
                                className={classes.headerFont}
                                align='left'
                            >
                                Similar Questions
                            </Typography>
                            <Grid className={classes.barWrapper}>
                                <ResponsiveBar
                                    data={barData}
                                    keys={['Topic1', 'Topic2', 'Topic3']}
                                    indexBy='Similar Questions'
                                    margin={{
                                        top: 50,
                                        right: 130,
                                        bottom: 50,
                                        left: 60,
                                    }}
                                    padding={0.3}
                                    colors={{ scheme: 'nivo' }}
                                    borderColor={{
                                        from: 'color',
                                        modifiers: [['darker', 1.6]],
                                    }}
                                    axisTop={null}
                                    axisRight={null}
                                    axisBottom={{
                                        tickSize: 5,
                                        tickPadding: 5,
                                        tickRotation: 0,
                                        legend: 'Questions',
                                        legendPosition: 'middle',
                                        legendOffset: 32,
                                    }}
                                    axisLeft={{
                                        tickSize: 5,
                                        tickPadding: 5,
                                        tickRotation: 0,
                                        legend: 'Total Questions',
                                        legendPosition: 'middle',
                                        legendOffset: -40,
                                    }}
                                    labelSkipWidth={12}
                                    labelSkipHeight={12}
                                    labelTextColor={{
                                        from: 'color',
                                        modifiers: [['darker', 1.6]],
                                    }}
                                    legends={[
                                        {
                                            dataFrom: 'keys',
                                            anchor: 'bottom-right',
                                            direction: 'column',
                                            justify: false,
                                            translateX: 120,
                                            translateY: 0,
                                            itemsSpacing: 2,
                                            itemWidth: 100,
                                            itemHeight: 20,
                                            itemDirection: 'left-to-right',
                                            itemOpacity: 0.85,
                                            symbolSize: 20,
                                            effects: [
                                                {
                                                    on: 'hover',
                                                    style: {
                                                        itemOpacity: 1,
                                                    },
                                                },
                                            ],
                                        },
                                    ]}
                                    animate={true}
                                    motionStiffness={90}
                                    motionDamping={15}
                                />
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
Stats.propTypes = {
    sent: PropTypes.string.isRequired,
    asked: PropTypes.string.isRequired,
    unanswered: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    speaker: PropTypes.string.isRequired,
};

export default Stats;
