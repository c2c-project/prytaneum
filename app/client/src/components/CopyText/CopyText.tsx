/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { IconButton, Tooltip, Grid, TextField, TextFieldProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { ContentCopy as CopyIcon } from '@local/icons/ContentCopy';
import useCopy from '@local/core/useCopy';

interface Props {
    text: string;
    className?: string;
    TextFieldProps?: TextFieldProps;
}

export const CopyText = React.forwardRef<HTMLDivElement, Props>(
    ({ text, className, TextFieldProps: _TextFieldProps }: Props, ref) => {
        const [copy] = useCopy();
        const theme = useTheme();

        return (
            <Grid id='copy-text-container' ref={ref} className={className} container alignItems='center' wrap='nowrap'>
                <Grid item xs={11} style={{ paddingRight: theme.spacing(1) }}>
                    <TextField
                        fullWidth
                        variant='filled'
                        style={{ fontSize: '1.3em' }}
                        value={text}
                        {..._TextFieldProps}
                    />
                </Grid>
                <Grid item xs='auto'>
                    <Tooltip title='Copy' aria-label='copy'>
                        <IconButton onPointerUp={() => copy(text)} edge='end' size='large'>
                            <CopyIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        );
    }
);

CopyText.defaultProps = {
    className: undefined,
    TextFieldProps: {},
};
