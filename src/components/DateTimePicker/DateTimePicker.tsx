/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, DateTimePickerProps, MuiPickersUtilsProvider } from "@material-ui/pickers";

/** Element for picking date & time
 * @category Component
 * @constructor DateTimePicker
 * @param  props refer to material-ui/pickers documentation
 */
export default function Picker(props: DateTimePickerProps) {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
                label='DateTimePicker'
                inputVariant='outlined'
                {...props}
            />
        </MuiPickersUtilsProvider>
    );
}
