import React from 'react';

export default function Logout() {
    // TODO: remove localstorage clear when stop using jwt for session tokens
    // FIXME:
    window.localStorage.clear();
    return <div />;
}
