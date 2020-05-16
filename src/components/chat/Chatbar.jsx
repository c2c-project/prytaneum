import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

function Chatbar({ onMessageSend }) {
    const [msg, setMsg] = React.useState('');
    const handleKeyPress = event => {
        if (event.key !== 'Enter') {
            return;
        }
        if (event.key === 'Enter' && event.shiftKey) {
            return;
        }
        event.preventDefault();
        onMessageSend(msg);
        setMsg('');
    };
    return (
        <TextField
            value={msg}
            id='chatbar'
            label='Discussion Comment'
            variant='outlined'
            onKeyDown={handleKeyPress}
            onChange={e => setMsg(e.target.value)}
            multiline
            fullWidth
        />
    );
}

Chatbar.propTypes = {
    onMessageSend: PropTypes.func.isRequired
};

export default Chatbar;
