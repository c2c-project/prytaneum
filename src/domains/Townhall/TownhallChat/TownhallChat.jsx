import React from 'react';
// import PropTypes from 'prop-types';
import TownhallChatModerator from './TownhallChatModerator';
import TownhallChatUser from './TownhallChatUser';
import useMessages from '../../../hooks/useMessages';
import useRoles from '../../../hooks/useRoles';
import Loader from '../../../components/Loader';

export default function TownhallChat() {
    const [messages, sendMessage] = useMessages();
    const [isLoading, isModOrAdmin] = useRoles(['moderator', 'admin']);

    if (isLoading) return <Loader />;

    const ChatVariant = isModOrAdmin ? TownhallChatModerator : TownhallChatUser;

    return <ChatVariant messages={messages} onMessageSend={sendMessage} />;
}

TownhallChat.propTypes = {};
