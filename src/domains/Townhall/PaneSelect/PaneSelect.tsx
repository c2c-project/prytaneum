/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
    MenuItem,
    Badge,
    ListItemSecondaryAction,
    Typography,
} from '@material-ui/core';

import TextField, { Props as TextFieldProps } from 'components/TextField';
import { PaneContext } from '../Contexts/Pane';
import { Panes } from '../types';

interface Props {
    options: string[];
    onChange: Pick<TextFieldProps, 'onChange'>;
}

export default function PaneSelect({
    options,
    onChange,
    value,
    ...rest
}: Props & TextFieldProps) {
    const [state, dispatch] = React.useContext(PaneContext);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value: newValue } = e.target;
        dispatch({ type: newValue as Panes, payload: value === newValue });
        onChange(e);
    };
    return (
        <TextField
            select
            variant='standard'
            onChange={handleChange}
            value={value}
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
                    {state[option] ? (
                        <Badge color='secondary' variant='dot'>
                            {option}
                        </Badge>
                    ) : (
                        option
                    )}
                </MenuItem>
            ))}
        </TextField>
    );
}
