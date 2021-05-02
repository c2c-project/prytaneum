import * as React from 'react';
import Component, { DataEntry } from './ProgressBar';

export default { title: '@local/components/Progress Bar' };

const timelineData: DataEntry[] = [
    {
        label: 'Introduced',
        value: 0,
    },
    {
        label: 'Under Vote',
        value: 50,
    },
    {
        label: 'Passed into Law',
        value: 100,
    },
];

export function Basic() {
    return <Component timeline={timelineData} currentVal={50} />;
}
