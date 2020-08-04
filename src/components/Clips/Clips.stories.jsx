import React from 'react';
import { Button } from '@storybook/react/demo';
import ClipTable from './ClipTable';

export default { title: 'Clips' };

export const withText = () => <Button>Hello Button</Button>;

export const clipTable = () => <ClipTable />;
