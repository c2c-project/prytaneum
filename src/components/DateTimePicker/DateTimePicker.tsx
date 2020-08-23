/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { DateTimePicker, DateTimePickerProps } from '@material-ui/pickers';

/** Element for picking date & time
 * @category Component
 * @constructor DateTimePicker
 * @param  props refer to material-ui/pickers documentation
 */
export default function Picker(props: DateTimePickerProps) {
    return (
        <DateTimePicker
            label='DateTimePicker'
            inputVariant='outlined'
            {...props}
        />
    );
}
