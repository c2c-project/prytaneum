/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { DateTimePicker } from '@material-ui/pickers';

/**
 * @description Element for picking date & time
 * @arg {import('@material-ui/pickers').DateTimePickerProps} props refer to material-ui/pickers documentation
 */
export default function Picker(props) {
    return (
        <DateTimePicker
            label='DateTimePicker'
            inputVariant='outlined'
            {...props}
        />
    );
}
