import React from 'react';
import { Button } from '@storybook/react/demo';
import ClipTable from './ClipTable';
import ClipDetails from './ClipDetails';
import ClipPortal from './ClipsPortal';
import ClipList from './ClipList';
import EditClip from './EditClip';

export default { title: 'Clips' };

export const clipDetails = () => <ClipDetails title='Clip Details 1' duration='1:32' tags={['History']} />;

export const clipTable = () => <ClipTable />;

export const clipsPortal = () => <ClipPortal />;

export const clipList = () => <ClipList />;

export const editClip = () => <EditClip />;
