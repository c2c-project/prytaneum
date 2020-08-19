import React from 'react';
import { Button } from '@storybook/react/demo';
import ClipTable from './ClipTable';
import ClipDetails from './ClipDetails';
import ClipPortal from './ClipsPortal';
import ClipList from './ClipList';
import EditClip from './EditClip';
import { ClipData } from '.';

const clip = {
    timeStamp: '00:40-1:53',
    duration: '1 min, 23 secs',
    title: 'Question title 1',
    description: 'Session Title',
    tags: ['History', 'Philosophy', 'Prop 60']
};

export default { title: 'Clips' };

export const clipDetails = () => (
    <ClipDetails title='Clip Details 1' duration='1:32' tags={['History']} />
);

export const clipTable = () => <ClipTable />;

export const clipsPortal = () => <ClipPortal clip={clip} />;

export const clipList = () => <ClipList />;

export const editClip = () => <EditClip />;
