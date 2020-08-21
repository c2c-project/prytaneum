import React from 'react';
import Popover from '@material-ui/core/Popover';

import ScrollTo from 'components/ScrollTo/ScrollTo';
import MessageList from 'components/MessageList';
import MessageItemAuthor from 'components/MessageItemAuthor';
import MessageItemText from 'components/MessageItemText';
import MessageItemTimestamp from 'components/MessageItemTimestamp';
import MessageListItem from 'components/MessageListItem';
import useSocketio from 'hooks/useSocketio';

interface Message {
    _id: string;
    message: string;
    username: string;
    moderated: boolean;
    sent: number;
    userId: string;
}

interface MessageProps {
    messages: Message[];
}

type PayloadBase = { _id: string };
interface NewMessageAction {
    type: 'new-message';
    payload: PayloadBase & Message;
}
interface UpdateMessageAction {
    type: 'update-message';
    payload: PayloadBase & Pick<Message, 'message'>;
}
interface DeleteMessageAction {
    type: 'hide-message';
    payload: PayloadBase;
}

type Actions = NewMessageAction | UpdateMessageAction | DeleteMessageAction;

const chatReducer = (state: Message[], action: Actions): Message[] => {
    switch (action.type) {
        case 'new-message':
            return [...state, action.payload];
        case 'update-message':
            return state.map((message) => {
                // TODO: (maybe) better type checking? I never check if action.payload._id exists first
                if (message._id === action.payload._id) {
                    return { ...message, ...action.payload };
                }
                return message;
            });
        case 'hide-message':
            return state.filter(
                (message) => message._id !== action.payload._id
            );
        default:
            // TODO: log that that we got some unimplemented action?
            return state;
    }
};

export default function TownhallChat() {
    const [state] = useSocketio<Message[], Actions>({
        url: '/chat',
        event: 'townhall-chat-state',
        reducer: chatReducer,
        initialState: [],
    });

    const [target, setTarget] = React.useState<Record<string, unknown> | null>(
        null
    );

    return (
        <div>
            <ScrollTo active direction='bottom'>
                <MessageList>
                    {state.map(
                        ({ _id, username, message, moderated, sent }) => (
                            <MessageListItem
                                key={_id}
                                hidden={moderated}
                                button
                                onClick={() => setTarget({ _id })}
                            >
                                <MessageItemTimestamp time={sent} />
                                <MessageItemAuthor name={username} />
                                <MessageItemText text={message} />
                            </MessageListItem>
                        )
                    )}
                </MessageList>
            </ScrollTo>
            <Popover
                open={Boolean(target)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                The content of the Popover.
            </Popover>
        </div>
    );
}
