/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { IconButton, Tooltip, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CopyIcon from '@material-ui/icons/ContentCopy';

import TextField, { Props as TextFieldProps } from 'components/TextField';

import useCopy from 'hooks/useCopy';

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

const Copy = React.forwardRef<HTMLDivElement, Props>(
    ({ text, className, TextFieldProps: _TextFieldProps }: Props, ref) => {
        const [copy] = useCopy();
        const classes = useStyles();

        return (
            <Grid
                ref={ref}
                className={className}
                container
                alignItems='center'
                wrap='nowrap'
            >
                <Grid item xs='auto' className={classes.text}>
                    <TextField
                        fullWidth
                        variant='filled'
                        value={text}
                        {..._TextFieldProps}
                    />
                </Grid>
                <Grid item xs='auto'>
                    <Tooltip title='Copy' aria-label='copy'>
                        <IconButton onPointerUp={() => copy(text)} edge='end'>
                            <CopyIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        );
    }
);

Copy.defaultProps = {
    className: undefined,
    TextFieldProps: {},
};

export default Copy;
