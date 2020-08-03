import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { ResponsivePie } from '@nivo/pie';
import { Townhall } from '../api';

const useStyles = makeStyles((theme) => ({
    root: {},

    title: {
        fontSize: '25px',
    },
    text: {
        fontWeight: theme.typography.fontWeightLight,
    },
    largeAvatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));

interface Props {
    townhall: Townhall;
}

export default function TownhallNivo(props: Props) {
    const classes = useStyles();
    const { townhall } = props;

    return (
        <div style={{ height: townhall.graphHeight }}>
            <ResponsivePie data={townhall.graphData} />
        </div>
    );
}
