import React from 'react';

import Component from './DateTimePicker';

export default {
    title: 'Components/DateTimePicker',
    component: Component,
};

export function DateTimePicker() {
    return <Component id='test' value={new Date()} onChange={() => {}} />;
}
