import React from 'react';

import TownhallList from 'pages/Townhall/TownhallList';
import TownhallProfile from 'pages/Townhall/TownhallProfile';
import TownhallProvider from 'domains/Townhall/Contexts/Townhall';
import TownhallForm from 'pages/Townhall/TownhallForm';

import HandleInviteLink from 'domains/Invite/HandleInviteLink';
import InviteForm from 'domains/Invite/InviteForm';

import history from 'utils/history';
import { addRoutes } from './utils';

const Invite = () => {
    return <div />;
};

const Settings = () => {
    return <div />;
};

addRoutes([
    {
        path: '/townhalls',
        action: (ctx) => {
            const next = ctx.next();
            if (next) return next;
            return <TownhallList />;
        },
        children: [
            {
                // this must go before :townhallId, otherwise the router will think "create" is an id
                path: '/create',
                action: () => {
                    return <TownhallForm />;
                },
            },
            {
                path: '/:townhallId',
                action: (ctx) => {
                    const { townhallId } = ctx.params as { townhallId: string };
                    const child = ctx.next();
                    if (!child)
                        return (
                            <TownhallProvider townhallId={townhallId}>
                                <TownhallProfile />
                            </TownhallProvider>
                        );
                    return (
                        <TownhallProvider townhallId={townhallId}>
                            {child}
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
                    {
                        path: '/invited',
                        action: (ctx) => {
                            const child = ctx.next();
                            if (!child) {
                                history.back(); // TODO change this?
                            }
                            return child;
                        },
                        children: [
                            {
                                path: '/:inviteToken',
                                action: (ctx) => {
                                    const { inviteToken } = ctx.params as {
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
                    {
                        path: '/settings',
                        action: () => {
                            return <Settings />;
                        },
                    },
                    {
                        path: '/update', // /townhalls/:townhallId/update
                        action: () => {
                            return <TownhallForm />;
                        },
                    },
                ],
            },
        ],
    },
]);
