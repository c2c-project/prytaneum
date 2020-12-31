import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import type { ChatMessage } from 'prytaneum-typings';

import MessageList from 'components/MessageList';
import MessageListItem from 'components/MessageListItem';
import Message from 'components/Message';
import ScrollTo from 'components/ScrollTo';

export interface Props {
    messages: ChatMessage[];
}

export default function ChatContent({ messages }: Props) {
    // TODO: use to calculate how many new messages there are
    // and update the pane context so it can display in the menu
    // const [, dispatch] = React.useContext(PaneContext);
    // const ref = React.useRef(0);
    const emptyMessage = (
        <Grid container item xs={12} justify='center' direction='column'>
            <Typography variant='h5' paragraph align='center'>
                Nothing to display here :(
            </Typography>
            <Typography variant='body1' align='center'>
                Start sending mesages by using the textbox below
            </Typography>
        </Grid>
    );

    if (messages.length === 0) return emptyMessage;

    return (
        <Grid
            item
            style={{
                overflowY: 'auto', // for scrolling
            }}
            container
            xs={12}
        >
            <ScrollTo active={messages.length > 10} direction='bottom'>
                <MessageList>
                    {messages.map(({ meta, message }, idx) => (
                        <MessageListItem
                            button={false}
                            onClick={() => {}} // TODO:
                            hidden={false}
                            key={idx}
                        >
                            <Message
                                name={meta.createdBy.name.first}
                                timestamp={meta.createdAt}
                                message={message}
                            />
                        </MessageListItem>
                    ))}
                </MessageList>
            </ScrollTo>
        </Grid>
    );
}
