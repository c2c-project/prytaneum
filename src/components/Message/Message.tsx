import React from 'react';
import PropTypes from 'prop-types';

import MessageList from '../MessageList';
import MessageListItem from '../MessageListItem';
import MessageItemText from '../MessageItemText';
import MessageItemAuthor from '../MessageItemAuthor';
import MessageItemTimestamp from '../MessageItemTimestamp';
import ScrollTo from '../ScrollTo/ScrollTo';
import { Message } from './types';

// const checkIsOwner = (user: { _id: string }, messageUserId = '') =>
//     user._id === messageUserId;

// export const MessageContext = React.createContext(false);
// interface Message {
//     _id: string;
//     userId: string;
//     username: string;
//     message: string;
//     moderated: boolean;
//     sent: number;
// }

interface Props {
    messages: Message[];
    button?: boolean;
    onClickMessage?: (_id: string) => void;
}

interface PropDefaults {
    onClickMessage: () => void;
    button: false;
}

/** Test Description
 *  @category Component
 *  @constructor Messages
*/
function Messages({ messages, button, onClickMessage }: Props & PropDefaults) {
    // const [, user] = useJwt();
    // const user = { _id: '' }; // PLACEHOLDER TODO: remove this/fix this

    // const filterQuestions = () => {
    //     if (!Array.isArray(messages)) {
    //         console.log('message is not an array');
    //         return [];
    //     }
    //     if (moderator) {
    //         return messages.filter((m) => {
    //             if (filter.moderated && m.moderated) {
    //                 // show message that m.moderated === true
    //                 return true;
    //             }
    //             if (filter.normal && !m.moderated) {
    //                 return true;
    //             }
    //             return false;
    //         });
    //     }
    //     return messages.filter((m) => !m.moderated);
    // };
    // const isOwnerOrModerator = (sentBy) => checkIsOwner(user, sentBy);
    // console.log(isOwnerOrModerator());
    return (
        <ScrollTo active direction='bottom'>
            {/* <MessageContext.Provider value={moderator}> */}
            <MessageList>
                {messages.map(({ _id, username, message, moderated, sent }) => (
                    <MessageListItem
                        key={_id}
                        hidden={moderated}
                        button={button}
                        onClick={() => onClickMessage(_id)}
                    >
                        <MessageItemTimestamp time={sent} />
                        <MessageItemAuthor name={username} />
                        <MessageItemText text={message} />
                    </MessageListItem>
                ))}
            </MessageList>
            {/* </MessageContext.Provider> */}
        </ScrollTo>
    );
}

Messages.defaultProps = {
    messages: [],
    button: false,
    onClickMessage: () => {},
};

Messages.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string,
            userId: PropTypes.string,
            username: PropTypes.string,
            message: PropTypes.string,
            moderated: PropTypes.bool,
        })
    ),
    onClickMessage: PropTypes.func,
    button: PropTypes.bool,
    // moderator: PropTypes.bool.isRequired,
};

export default Messages;
