import React from 'react';
import { Routes } from 'universal-router/sync';

// import Login from 'pages/Auth/Login';

import TownhallContextProvider from 'domains/Townhall/Contexts/Townhall';
import TownhallSettings from 'domains/Townhall/TownhallSettings';
import TownhallList from 'pages/Townhall/TownhallList';

import InviteForm from 'domains/Invite/InviteForm';

import UserSettings from 'domains/User/UserSettings';
import RequireLogin from 'components/RequireLogin';

import history from 'utils/history';
import Redirect from 'components/Redirect';
import RequireRoles from 'components/RequireRoles';
import { addRoutes, areParamsValid, MyContext } from './utils';

const organizerRoutes: Routes<JSX.Element, MyContext> = [
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
                        <TownhallContextProvider townhallId={townhallId}>
                            {ctx.next() || <TownhallSettings />}
                        </TownhallContextProvider>
                    );
                },
                children: [
                    {
                        path: '/invite',
                        action: () => {
                            return <InviteForm />;
                        },
                    },
                    {
                        path: '/invited',
                        action: (ctx) => {
                            const child = ctx.next();
                            if (!child) {
                                history.back(); // TODO: change this?
                            }
                            return child;
                        },
                    },
                ],
            },
        ],
    },
];

addRoutes([
    {
        // user id is the currently logged in user only
        // the context is already higher up in the tree
        path: '/user',
        action: (ctx) => {
            return <RequireLogin>{ctx.next()}</RequireLogin>;
        },
        children: [
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
        ],
    },
]);
