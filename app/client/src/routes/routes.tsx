import React from 'react';

import QueryProvider from 'contexts/Query';

import RegPrompt from 'domains/Auth/RegPrompt';
import TownhallProvider from 'contexts/Townhall';
import TownhallSettings from 'domains/Townhall/TownhallSettings';
import TownhallList from 'pages/TownhallList';
import TownhallLive from 'pages/TownhallLive';
import FadeThrough from 'animations/FadeThrough';
import LoginWithToken from 'domains/Logical/LoginWithToken';

import Dashboard from 'pages/Dashboard';

import Login from 'pages/Login';
import Register from 'pages/Register';
import ForgotPasswordRequest from 'pages/ForgotPassRequest';
// import ForgotPasswordReset from 'pages/Auth/ForgotPassReset';
import Logout from 'pages/Logout';

import NotFound from 'pages/NotFound';

import InviteForm from 'domains/Invite/InviteForm';

import UserSettings from 'domains/User/UserSettings';

import RequireLogin from 'domains/Logical/RequireLogin';
import Redirect from 'domains/Logical/Redirect';
import RequireRoles from 'domains/Logical/RequireRoles';
import history from 'utils/history';
import { addRoutes, areParamsValid, PrytaneumRoutes, PrytaneumRoute } from './utils';

const notFound: PrytaneumRoute = {
    path: '(.*)',
    action: (ctx) => (
        <FadeThrough key={ctx.pathname} animKey={ctx.pathname}>
            <NotFound />
        </FadeThrough>
    ),
};

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
                    if (!areParamsValid(ctx.params, ['townhallId'])) return <Redirect href='/login' />;

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
            if (!areParamsValid(ctx.params, ['townhallId'])) return <Redirect href='/logout' />;

            const { townhallId } = ctx.params;
            return (
                <QueryProvider query={ctx.query}>
                    <LoginWithToken>
                        <TownhallProvider townhallId={townhallId}>
                            <RegPrompt />
                            <TownhallLive />
                        </TownhallProvider>
                    </LoginWithToken>
                </QueryProvider>
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
        action: (ctx) => ({
            component: (
                <FadeThrough key={ctx.pathname} animKey={ctx.pathname}>
                    <Login onLogin={() => history.push('/app/home')} />
                </FadeThrough>
            ),
            layoutProps: {
                disablePadding: true,
            },
        }),
    },
    {
        path: '/register',
        action: (ctx) => ({
            component: (
                <QueryProvider query={ctx.query}>
                    <FadeThrough key={ctx.pathname} animKey={ctx.pathname}>
                        <Register />
                    </FadeThrough>
                </QueryProvider>
            ),
            layoutProps: {
                disablePadding: true,
            },
        }),
    },
    {
        path: '/forgot-password/request',
        action: (ctx) => ({
            component: (
                <FadeThrough key={ctx.pathname} animKey={ctx.pathname}>
                    <ForgotPasswordRequest />
                </FadeThrough>
            ),
            layoutProps: {
                disablePadding: true,
            },
        }),
    },
    {
        path: '/logout',
        action: () => ({
            component: <Logout />,
            layoutProps: {
                disablePadding: true,
            },
        }),
    },
    {
        // user id is the currently logged in user
        // the context is already higher up in the tree
        path: '/app',
        action: (ctx) => {
            const element = ctx.next();
            if (!React.isValidElement(element)) return <Redirect href='/login' />;
            return <RequireLogin key={ctx.pathname}>{element}</RequireLogin>;
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
                    if (!React.isValidElement(element)) return <Redirect href='/login' />;

                    return <RequireRoles requiredRoles={['organizer']}>{element}</RequireRoles>;
                },

                children: organizerRoutes,
            },
            {
                path: '/settings',
                action: () => <UserSettings />,
            },
            notFound,
        ],
    },
    {
        path: '/join',
        action: (ctx) => {
            const element = ctx.next();
            if (!React.isValidElement(element)) return <Redirect href='/login' />;
            return {
                component: element,
                layoutProps: {
                    hideSideNav: true,
                    ContainerProps: {
                        maxWidth: 'xl',
                    },
                    disablePadding: true,
                },
            };
        },
        children: joinRoutes,
    },
    notFound,
]);
