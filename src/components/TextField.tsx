/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import MUITextField, { TextFieldProps } from '@material-ui/core/TextField';

function labelToId(label: string) {
    return label
        .split(' ')
        .map((word) => {
            return word.slice(0, 1).toLowerCase() + word.slice(1);
        })
        .join('');
}

/** TextField in the MaterialUI format and theme
 * @category Component
 * @constructor TextField
 * @todo params
 */
export default function TextField(props: TextFieldProps & { label: string }) {
    const { children, ...passThroughProps } = props;
    return (
        <MUITextField
            variant='outlined'
            fullWidth
            id={labelToId(passThroughProps.label)}
            {...passThroughProps}
            autoComplete='off'
        >
            {children}
        </MUITextField>
    );
}
