import React from 'react';
import PropTypes from 'prop-types';
import useJwt from '../../../hooks/useJwt';
import MessageList from './MessageList';
import MessageListItem from './MessageListItem';
import MessageItemText from './MessageItemText';
import MessageItemAuthor from './MessageItemAuthor';
import MessageItemTimestamp from './MessageItemTimestamp';
import ScrollToBottom from '../../ScrollToBottom';

const checkIsOwner = (user, messageUserId) => {
    return user._id === messageUserId;
};

export const MessageContext = React.createContext(false);

function Messages({ messages, onClickMessage, moderator }) {
    const [, user] = useJwt();
    
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
    const isOwnerOrModerator = (sentBy) =>
        moderator || checkIsOwner(user, sentBy);
    return (
        <ScrollToBottom active>
            <MessageContext.Provider value={moderator}>
                <MessageList>
                    {messages.map(
                        ({ _id, userId, username, message, moderated }) => (
                            <MessageListItem
                                key={_id}
                                hidden={moderated}
                                button={isOwnerOrModerator(userId)}
                                onClick={() => onClickMessage(_id)}
                            >
                                <MessageItemTimestamp time={0} />
                                <MessageItemAuthor name={username} />
                                <MessageItemText text={message} />
                            </MessageListItem>
                        )
                    )}
                </MessageList>
            </MessageContext.Provider>
        </ScrollToBottom>
    );
}

Messages.defaultProps = {
    messages: [],
};

Messages.propTypes = {
    messages: PropTypes.array,
    onClickMessage: PropTypes.func.isRequired,
    moderator: PropTypes.bool.isRequired,
};

export default Messages;

//         <Dialog
//             open={Boolean(targetMsg)}
//             onClose={() => setTargetMsg(null)}
//         >
//             <Container maxWidth='sm' className={classes.maxHeight}>
//                 <Grid
//                     container
//                     className={classes.maxHeight}
//                     alignContent='center'
//                 >
//                     {/* If the (user is not a moderator) OR (user is a moderator and is the owner of the message) then render UserMessageActions */}
//                     {targetMsg &&
//                         (!isModerator ||
//                             (isModerator &&
//                                 checkIsOwner(user, targetMsg.userId))) && (
//                             <UserMessageActions
//                                 targetMsg={targetMsg}
//                                 onClick={() => setTargetMsg(null)}
//                             />
//                         )}

//                     {/* If the (user is a moderator) AND (is not the owner of the message) then render Actions */}
//                     {targetMsg &&
//                         isModerator &&
//                         !checkIsOwner(user, targetMsg.userId) && (
//                             <Actions
//                                 targetMsg={targetMsg}
//                                 onClick={() => setTargetMsg(null)}
//                             />
//                         )}
//                 </Grid>
//             </Container>
//         </Dialog>
