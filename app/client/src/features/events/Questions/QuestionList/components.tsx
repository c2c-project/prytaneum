import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';

import { Props as QuestionProps } from '../QuestionCard';

export function EmptyMessage() {
    return (
        <>
            <Typography variant='h5' paragraph align='center'>
                Nothing to display here :(
            </Typography>
            <Typography variant='body1' align='center'>
                Click or tap the button above to start asking questions!
            </Typography>
        </>
    );
}

export function RefreshMessage() {
    return (
        <>
            <Typography variant='body1' align='center'>
                Click the Refresh button above!
            </Typography>
        </>
    );
}
