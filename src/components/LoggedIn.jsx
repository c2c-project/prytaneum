import React from 'react';
import { Redirect } from 'react-router-dom';
import useJwt from '../hooks/useJwt';

// eslint-disable-next-line
export default function LoggedIn({ children }) {
    const [jwt] = useJwt();
    // assumption is that if there is no jwt, then they are not logged in
    return jwt ? children : <Redirect to='/logout' />;
}
