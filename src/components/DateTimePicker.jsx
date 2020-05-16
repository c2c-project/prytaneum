/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { DateTimePicker } from '@material-ui/pickers';

export default function Picker(props) {
    return (
        <DateTimePicker
            label='DateTimePicker'
            inputVariant='outlined'
            {...props}
        />
    );
}
