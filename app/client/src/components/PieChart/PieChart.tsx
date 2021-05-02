import * as React from 'react';
import { ResponsivePie } from '@nivo/pie';

export interface PieDatum {
    id: string | number;
    value: number;
    [key: string]: string | number;
}

export type PieDatumWithColor = PieDatum & {
    color: string;
};

interface Props {
    height: number;
    data: PieDatum[];
}
export type AccessorFunc = (datum: PieDatum) => string;

export type ValueFormatter = (value: number) => string | number;

export default function TownhallNivo({ height, data }: Props) {
    return (
        <div style={{ height }}>
            <ResponsivePie data={data} />
        </div>
    );
}
