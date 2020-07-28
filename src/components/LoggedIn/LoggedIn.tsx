import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
// import useJwt from '../hooks/useJwt';

const { NODE_ENV } = process.env;

interface Props {
    children: JSX.Element | JSX.Element[];
}

/**
 * @description redirects to the login page if the user is not logged in
 * ie they were trying to access a page that, at minimum, requires the user to be logged in
 */
export default function LoggedIn({ children }: Props) {
    const jwt = { _id: '' }; // useJwt();
    if (NODE_ENV === 'development') {
        console.log('not redirecting');
        return <>{children}</>;
    }
    console.log('redirecting');
    // assumption is that if there is no jwt, then they are not logged in
    return jwt ? <>{children}</> : <Redirect to='/logout' />;
}

LoggedIn.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
};
