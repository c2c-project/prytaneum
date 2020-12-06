import React from 'react';

// import Login from 'pages/Auth/Login';

import TownhallContextProvider from 'domains/Townhall/Contexts/Townhall';
import TownhallSettings from 'domains/Townhall/TownhallSettings';
import TownhallList from 'pages/Townhall/TownhallList';
import TownhallForm from 'pages/Townhall/TownhallForm';

import HandleInviteLink from 'domains/Invite/HandleInviteLink';
import InviteForm from 'domains/Invite/InviteForm';

import UserSettings from 'domains/Auth/UserSettings';
import UserProvider from 'contexts/User';
import RequireLogin from 'components/RequireLogin';

import Page from 'layout/Page';

// import { get as getFromStorage } from 'utils/storage';
import history from 'utils/history';
import { addRoutes } from './utils';

addRoutes([
    {
        // user id is the currently logged in user only
        path: '/user',
        action: (ctx) => {
            // if (!getFromStorage('isLoggedIn')) {
            //     return <Login onLogin={() => history.push(ctx.pathname)} />;
            // }
            return (
                <RequireLogin>
                    <Page>{ctx.next()}</Page>
                </RequireLogin>
            );
        },
        children: [
            {
                path: '/my-townhalls',
                action: (ctx) => {
                    const child = ctx.next();
                    if (child) return child;
                    return <TownhallList />;
                },
                children: [
                    {
                        // this must go before :townhallId, otherwise the router will think "create" is an id
                        path: '/create',
                        action: () => <TownhallForm />,
                    },
                    {
                        path: '/:townhallId',
                        action: (ctx) => {
                            const { townhallId } = ctx.params as {
                                townhallId: string;
                            };
                            const component = ctx.next() || (
                                <TownhallSettings />
                            );
                            // FIXME: need to move the context up in the tree before the routing somehow
                            return (
                                <TownhallContextProvider
                                    townhallId={townhallId}
                                >
                                    {component}
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
                                children: [
                                    {
                                        path: '/:inviteToken',
                                        action: (ctx) => {
                                            const {
                                                inviteToken,
                                            } = ctx.params as {
                                                inviteToken: string;
                                            };
                                            return (
                                                <HandleInviteLink
                                                    inviteToken={inviteToken}
                                                />
                                            );
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                path: '/settings',
                action: () => (
                    <UserProvider>
                        <UserSettings />
                    </UserProvider>
                ),
            },
        ],
    },
]);
