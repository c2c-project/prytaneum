import React from 'react';

import TownhallProvider from 'contexts/Townhall';
import TownhallSettings from 'domains/Townhall/TownhallSettings';
import TownhallList from 'pages/TownhallList';
import TownhallLive from 'pages/TownhallLive';
import FadeThrough from 'components/FadeThrough';

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
import { addRoutes, areParamsValid, PrytaneumRoutes } from './utils';

const organizerRoutes: PrytaneumRoutes = [
    {
        path: '/my-townhalls',
        action: (ctx) => {
            const child = ctx.next();
            if (child) return child;
            return <TownhallList key={ctx.path} />;
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

const joinRoutes: PrytaneumRoutes = [
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
        action: (ctx) => (
            <FadeThrough key={ctx.pathname} animKey={ctx.pathname}>
                <Login onLogin={() => history.push('/app/home')} />
            </FadeThrough>
        ),
    },
    {
        path: '/register',
        action: (ctx) => (
            <FadeThrough key={ctx.pathname} animKey={ctx.pathname}>
                <Register />
            </FadeThrough>
        ),
    },
    {
        path: '/forgot-password/request',
        action: (ctx) => (
            <FadeThrough key={ctx.pathname} animKey={ctx.pathname}>
                <ForgotPasswordRequest />
            </FadeThrough>
        ),
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
            const element = ctx.next();
            if (!React.isValidElement(element))
                return <Redirect href='/login' />;
            return (
                <FadeThrough key={ctx.pathname} animKey={ctx.pathname}>
                    <RequireLogin key={ctx.pathname}>{element}</RequireLogin>
                </FadeThrough>
            );
        },
        children: [
            {
                path: '/home',
                action: (ctx) => <Dashboard key={ctx.path} />,
            },
            {
                path: '/organizer',
                action: (ctx) => {
                    const element = ctx.next();
                    if (!React.isValidElement(element))
                        return <Redirect href='/login' />;

                    return (
                        <RequireRoles requiredRoles={['organizer']}>
                            {element}
                        </RequireRoles>
                    );
                },

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
        action: (ctx) => {
            const element = ctx.next();
            if (!React.isValidElement(element))
                return <Redirect href='/login' />;
            return {
                component: <RequireLogin>{element}</RequireLogin>,
                layoutProps: {
                    hideSideNav: true,
                    ContainerProps: { maxWidth: 'xl' },
                },
            };
        },
        children: joinRoutes,
    },
    { path: '(.*)', action: () => <h1>Ooops! No page found.</h1> }, // TODO: better 404 page
]);
