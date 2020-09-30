import React from 'react';

/** Logs the user out by redirecting to /login after clearing the window's local storage
 *  @category Domains/Auth
 *  @constructor Logout
*/
export default function Logout() {
    // TODO: remove localstorage clear when stop using jwt for session tokens
    // FIXME:
    window.localStorage.clear();
    return <div />;
}
