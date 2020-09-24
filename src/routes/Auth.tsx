import React from 'react';

import history from 'utils/history';

import Login from 'pages/Auth/Login';
import Register from 'pages/Auth/Register';
import ForgotPasswordRequest from 'pages/Auth/ForgotPassRequest';
import { addRoutes } from './utils';

addRoutes([
    {
        path: '/auth',
        action: (ctx) => {
            return ctx.next();
        },
        children: [
            {
                path: '/login',
                action: () => (
                    <Login
                        onLogin={() => history.push('/home')}
                        forgotPassRoute='/auth/forgot-password/request'
                        registerRoute='/auth/register'
                    />
                ),
            },
            {
                path: '/register',
                action: () => <Register />,
            },
            {
                path: '/forgot-password/request',
                action: () => <ForgotPasswordRequest />,
            },
        ],
    },
]);
