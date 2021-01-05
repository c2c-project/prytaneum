import React from 'react';
import { IconButton, Tooltip, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CopyIcon from '@material-ui/icons/ContentCopy';

import useCopy from 'hooks/useCopy';

const useStyles = makeStyles((theme) => ({
    text: {
        paddingRight: theme.spacing(2),
    },
}));

interface Props {
    text: string;
    className?: string;
}

const Copy = React.forwardRef<HTMLDivElement, Props>(
    ({ text, className }: Props, ref) => {
        const [copy] = useCopy();
        const classes = useStyles();

        return (
            <Grid ref={ref} className={className} container alignItems='center'>
                <Grid item xs='auto' className={classes.text}>
                    {text}
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

Copy.defaultProps = {
    className: undefined,
};

export default Copy;
