import React from 'react';
import { Routes } from 'universal-router/sync';

import TownhallProvider from 'contexts/Townhall';
import TownhallSettings from 'domains/Townhall/TownhallSettings';
import TownhallList from 'pages/TownhallList';
import TownhallLive from 'pages/TownhallLive';

import Dashboard from 'pages/Dashboard';

import Login from 'pages/Login';
import Register from 'pages/Register';
import ForgotPasswordRequest from 'pages/ForgotPassRequest';
// import ForgotPasswordReset from 'pages/Auth/ForgotPassReset';
import Logout from 'pages/Logout';

import InviteForm from 'domains/Invite/InviteForm';

import UserSettings from 'domains/User/UserSettings';

import RequireLogin from 'components/RequireLogin';
import Redirect from 'components/Redirect';
import RequireRoles from 'components/RequireRoles';
import history from 'utils/history';
import { addRoutes, areParamsValid, MyContext } from './utils';

const organizerRoutes: Routes<React.ReactNode, MyContext> = [
    {
        path: '/my-townhalls',
        action: (ctx) => {
            const child = ctx.next();
            if (child) return child;
            return <TownhallList />;
        },
        children: [
            {
                path: '/:townhallId',
                action: (ctx) => {
                    if (!areParamsValid(ctx.params, ['townhallId']))
                        return <Redirect href='/login' />;

                    const { townhallId } = ctx.params;
                    return (
                        <TownhallProvider townhallId={townhallId}>
                            {ctx.next() || <TownhallSettings />}
                        </TownhallProvider>
                    );
                },
                children: [
                    {
                        path: '/invite',
                        action: () => {
                            return <InviteForm />;
                        },
                    },
                ],
            },
        ],
    },
];

const joinRoutes: Routes<React.ReactNode, MyContext> = [
    {
        path: '/:townhallId',
        action: (ctx) => {
            if (!areParamsValid(ctx.params, ['townhallId']))
                return <Redirect href='/logout' />;

            const { townhallId } = ctx.params;
            return (
                <TownhallProvider townhallId={townhallId}>
                    <TownhallLive />
                </TownhallProvider>
            );
        },
    },
];

addRoutes([
    {
        path: '/',
        action: () => {
            return <Redirect href='/login' />;
        },
    },
    {
        path: '/login',
        action: () => <Login onLogin={() => history.push('/app/home')} />,
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
    {
        // user id is the currently logged in user
        // the context is already higher up in the tree
        path: '/app',
        action: (ctx) => {
            return <RequireLogin>{ctx.next()}</RequireLogin>;
        },
        children: [
            {
                path: '/home',
                action: () => {
                    return <Dashboard />;
                },
            },
            {
                path: '/organizer',
                action: (ctx) => (
                    <RequireRoles requiredRoles={['organizer']}>
                        {ctx.next()}
                    </RequireRoles>
                ),
                children: organizerRoutes,
            },
            {
                path: '/settings',
                action: () => <UserSettings />,
            },
            { path: '(.*)', action: () => <h1>Ooops! No page found.</h1> }, // TODO: better 404 page
        ],
    },
    {
        path: '/join',
        // TODO: prompt login here
        action: (ctx) => <RequireLogin>{ctx.next()}</RequireLogin>,
        children: joinRoutes,
    },
    { path: '(.*)', action: () => <h1>Ooops! No page found.</h1> }, // TODO: better 404 page
]);
