import React from 'react';
import PropTypes from 'prop-types';
import Chat from '../../../components/Chat';

export default function TownhallChatUser({ title, messages, onMessageSend }) {
    return (
        <Chat title={title} onMessageSend={onMessageSend} messages={messages} />
    );
}

TownhallChatUser.propTypes = {
    title: PropTypes.string.isRequired,
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
    onMessageSend: PropTypes.func.isRequired,
};
