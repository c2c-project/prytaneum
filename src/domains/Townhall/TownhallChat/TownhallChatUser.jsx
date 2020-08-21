import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Chat from '../../../components/Chat';
import MessageList from '../../../components/Message/MessageList';
import MessageListItem from '../../../components/Message/MessageListItem';
import MessageItemText from '../../../components/Message/MessageItemText';
import MessageItemAuthor from '../../../components/Message/MessageItemAuthor';
import MessageItemTimestamp from '../../../components/Message/MessageItemTimestamp';
import MessageOwnerActions from '../../../components/Message/MessageOwnerActions';
import ScrollTo from '../../../components/ScrollTo/ScrollTo';
import Dialog from '../../../components/Dialog';
import UserContext from '../../../contexts/User';

const useStyles = makeStyles({
    maxHeight: {
        height: '100%',
    },
});

const checkIsOwner = (user, messageUserId = '') =>
    user && user._id === messageUserId;

export default function TownhallChatUser({ title, messages, onMessageSend }) {
    const classes = useStyles();
    const hideModerated = (message) => !message.moderated;
    const [targetMessage, setTargetMessage] = React.useState(null);
    const userMessages = messages.filter(hideModerated);
    const user = React.useContext(UserContext);
    return (
        <>
            <Chat title={title} onMessageSend={onMessageSend}>
                <ScrollTo active direciton='bottom'>
                    <MessageList>
                        {userMessages.map((userMessage) => {
                            const {
                                _id,
                                userId,
                                username,
                                message,
                                sent,
                            } = userMessage;
                            return (
                                <MessageListItem
                                    key={_id}
                                    button={checkIsOwner(user, userId)}
                                    onClick={() =>
                                        setTargetMessage(userMessage)
                                    }
                                >
                                    <MessageItemTimestamp time={sent} />
                                    <MessageItemAuthor name={username} />
                                    <MessageItemText text={message} />
                                </MessageListItem>
                            );
                        })}
                    </MessageList>
                </ScrollTo>
            </Chat>
            <Dialog
                open={Boolean(targetMessage)}
                onClose={() => setTargetMessage(null)}
            >
                <Container maxWidth='sm' className={classes.maxHeight}>
                    <Grid
                        container
                        className={classes.maxHeight}
                        alignContent='center'
                    >
                        <MessageOwnerActions
                            targetMessage={targetMessage}
                            onClick={() => setTargetMessage(null)}
                        />
                    </Grid>
                </Container>
            </Dialog>
        </>
    );
}

TownhallChatUser.propTypes = {
    title: PropTypes.string.isRequired,
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
    onMessageSend: PropTypes.func.isRequired,
};
