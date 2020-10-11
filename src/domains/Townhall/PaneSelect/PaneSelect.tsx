/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { MenuItem } from '@material-ui/core';

import TextField, { Props as TextFieldProps } from 'components/TextField';

interface Props {
    options: string[];
}

export default function PaneSelect({
    options,
    ...rest
}: Props & TextFieldProps) {
    return (
        <TextField
            select
            {...rest}
            SelectProps={{
                MenuProps: {
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'center',
                    },
                    transformOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    },
                    // anchorPosition: {
                    //     top: 200,
                    //     left: 400,
                    // },
                    getContentAnchorEl: null,
                },
            }}
        >
            {options.map((option) => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </TextField>
    );
}
