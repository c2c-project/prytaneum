import React from 'react';
import { Grid } from '@material-ui/core';

import { Props as ChatContentProps } from 'components/ChatContent';
import { Props as ChatbarProps } from 'components/Chatbar';

interface Props {
    children: React.ReactElement<ChatContentProps | ChatbarProps>[];
    className?: string;
}

export default function Chat({ children, className }: Props) {
    return (
        <Grid container direction='column' className={className} wrap='nowrap'>
            {children}
        </Grid>
    );
}

Chat.defaultProps = {
    className: undefined,
};
