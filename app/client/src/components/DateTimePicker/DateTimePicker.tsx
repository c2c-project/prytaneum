/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    DateTimePicker as MUIDateTimePicker,
    DateTimePickerProps,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';

/** Element for picking date & time
 * @category Component
 * @constructor DateTimePicker
 * @param  props refer to material-ui/pickers documentation
 */
export function DateTimePicker(props: DateTimePickerProps) {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <MUIDateTimePicker label='DateTimePicker' inputVariant='outlined' {...props} />
        </MuiPickersUtilsProvider>
    );
}
