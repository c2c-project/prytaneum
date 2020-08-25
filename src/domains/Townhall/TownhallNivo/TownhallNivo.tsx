import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { Townhall } from '../types';

interface Props {
    townhall: Townhall;
}

export default function TownhallNivo(props: Props) {
    const { townhall } = props;

    return (
        <div style={{ height: townhall.graphHeight }}>
            <ResponsivePie data={townhall.graphData} />
        </div>
    );
}
