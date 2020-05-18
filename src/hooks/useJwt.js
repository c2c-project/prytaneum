import jwtDecode from 'jwt-decode';
// import React from 'react';
// not technically a "hook" -- not stateful and no side effects but yeah
const decode = jwt => {
    try {
        return jwtDecode(jwt);
    } catch (e) {
        return '';
    }
};
export default function useJwt() {
    const jwt = localStorage.getItem('jwt');
    // React.useEffect(() => {
    //     console.log('in here');
    //     window.onstorage = () => {
    //         console.log(window.localStorage);
    //     };
    // });
    // don't decode unless the token exists
    const rawToken = jwt ? decode(jwt) : null;
    console.log(jwt);
    return [jwt, rawToken];
}
