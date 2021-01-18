import React from 'react';
import { Grid, Typography, ListItem, makeStyles } from '@material-ui/core';
import type { ChatMessage } from 'prytaneum-typings';
import { motion, AnimateSharedLayout } from 'framer-motion';

import MessageList from 'components/MessageList';
// import MessageListItem from 'components/MessageListItem';
import Message from 'components/Message';
import ScrollTo from 'components/ScrollTo';

export interface Props {
    messages: ChatMessage[];
}

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        minHeight: 475,
        maxWidth: 600,
    },
});

export default function ChatContent({ messages }: Props) {
    const classes = useStyles();
    // TODO: use to calculate how many new messages there are
    // and update the pane context so it can display in the menu
    // const [, dispatch] = React.useContext(PaneContext);
    // const ref = React.useRef(0);

    if (messages.length === 0)
        return (
            <Grid
                container
                item
                xs={12}
                justify='center'
                direction='column'
                className={classes.root}
            >
                <Typography variant='h5' paragraph align='center'>
                    Nothing to display here :(
                </Typography>
                <Typography variant='body1' align='center'>
                    Start sending mesages by using the textbox below
                </Typography>
            </Grid>
        );

    return (
        <AnimateSharedLayout>
            <Grid
                item
                style={{
                    overflowY: 'auto', // for scrolling
                    overflowX: 'hidden', // otherwise a horizontal scrollbar will appear during load anim
                }}
                container
                xs={12}
                className={classes.root}
            >
                <ScrollTo active={messages.length > 3} direction='bottom'>
                    <MessageList>
                        {messages.map(({ meta, message, _id }) => (
                            <motion.li
                                layout
                                key={_id}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                            >
                                <ListItem
                                    onClick={() => {}} // TODO:
                                    component='div'
                                >
                                    <Message
                                        name={meta.createdBy.name.first}
                                        timestamp={meta.createdAt}
                                        message={message}
                                    />
                                </ListItem>
                            </motion.li>
                        ))}
                    </MessageList>
                </ScrollTo>
            </Grid>
        </AnimateSharedLayout>
    );
}
