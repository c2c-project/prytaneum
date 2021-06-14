/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { IconButton, Tooltip, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ContentCopy as CopyIcon } from '@local/icons/ContentCopy';

import { TextField, Props as TextFieldProps } from '@local/components/TextField';

import useCopy from '@local/hooks/useCopy';

const useStyles = makeStyles((theme) => ({
    text: {
        paddingRight: theme.spacing(2),
    },
}));

interface Props {
    text: string;
    className?: string;
    TextFieldProps?: TextFieldProps;
}

export const CopyText = React.forwardRef<HTMLDivElement, Props>(
    ({ text, className, TextFieldProps: _TextFieldProps }: Props, ref) => {
        const [copy] = useCopy();
        const classes = useStyles();

        return (
            <Grid ref={ref} className={className} container alignItems='center' wrap='nowrap'>
                <Grid item xs='auto' className={classes.text}>
                    <TextField fullWidth variant='filled' value={text} {..._TextFieldProps} />
                </Grid>
                <Grid item xs='auto'>
                    <Tooltip title='Copy' aria-label='copy'>
                        <IconButton onClick={() => copy(text)} edge='end'>
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
