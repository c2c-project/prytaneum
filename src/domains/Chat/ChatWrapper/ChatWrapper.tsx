import React from 'react';
import { Grid } from '@material-ui/core';

import { Props as ChatContentProps } from '../ChatContent';
import { Props as ChatbarProps } from '../Chatbar';

interface Props {
    children: React.ReactElement<ChatContentProps | ChatbarProps>[];
}

export default function Chat({ children }: Props) {
    return (
        <Grid container direction='column'>
            {children}
        </Grid>
    );
}
