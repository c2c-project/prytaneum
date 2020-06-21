/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import MuiPaper, { PaperProps } from '@material-ui/core/Paper';

export default function Paper(props: PaperProps) {
    const { children } = props;
    return (
        <MuiPaper elevation={3} {...props}>
            {children}
        </MuiPaper>
    );
}
