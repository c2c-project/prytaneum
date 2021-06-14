import * as React from 'react';
import { Meta } from '@storybook/react';
import Component from './DateTimePicker';

export default {
    title: '@local/components/DateTimePicker',
    component: Component,
    parameters: {
        layout: 'centered',
    },
} as Meta;

export function DateTimePicker() {
    const [state, setState] = React.useState<Date | null>(new Date());
    return <Component value={state} onChange={(date) => setState(date)} />;
}
