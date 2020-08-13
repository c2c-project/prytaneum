import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
// import useJwt from '../hooks/useJwt';

const { NODE_ENV } = process.env;

interface Props {
    children: JSX.Element | JSX.Element[];
    jwt: boolean;
}

/**
 * redirects to the login page if the user is not logged in
 * ie they were trying to access a page that, at minimum, requires the user to be logged in
 * @category Component
 * @constructor LoggedIn
 * @param Props
 * @param {boolean} jwt is the current user signed in? 
 * @param {JSX.Element | JSX.Element[]} children to return if jwt is true
 * @example
 * function example() {
    ...
    const children = <h1>LoggedIn</h1>;
    ...
    return (
        <Route path='/app'>
            <LoggedIn
                children={children}
            />
        </Route>
    );
}
 * @mermaid
 * sequenceDiagram
    example->>LoggedIn: checks if LoggedIn
    LoggedIn-->>example: returns either {children} or /logout
 */
export default function LoggedIn({ children, jwt }: Props) {
    // const jwt = '';//{ _id: '' }; // useJwt();
    if (NODE_ENV === 'development') {
        console.log('not redirecting');
        return <>{children}</>;
    }
    // console.log('redirecting');
    // assumption is that if there is no jwt, then they are not logged in
    return jwt ? <>{children}</> : <Redirect to='/logout' />;
}

LoggedIn.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
    jwt: PropTypes.bool.isRequired,
};
