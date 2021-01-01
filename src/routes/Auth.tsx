import React from 'react';

import history from 'utils/history';

import Login from 'pages/Auth/Login';
import Register from 'pages/Auth/Register';
import ForgotPasswordRequest from 'pages/Auth/ForgotPassRequest';
import ForgotPasswordReset from 'pages/Auth/ForgotPassReset';
import Logout from 'pages/Auth/Logout';

import { addRoutes } from './utils';

addRoutes([
    {
        path: '/login',
        action: () => <Login onLogin={() => history.push('/home')} />,
    },
    {
        path: '/register',
        action: () => <Register />,
    },
    {
        path: '/forgot-password/request',
        action: () => <ForgotPasswordRequest />,
    },
    {
        path: '/forgot-password/reset',
        // action: () => <ForgotPassword
    },
    {
        path: '/logout',
        action: () => {
            return <Logout />;
        },
    },
]);
