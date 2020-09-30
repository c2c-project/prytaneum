import React from 'react';

import TownhallList from 'pages/Townhall/TownhallList';
import TownhallProfile from 'pages/Townhall/TownhallProfile';
import TownhallProvider from 'domains/Townhall/Contexts/Townhall';

import HandleInviteLink from 'domains/Invite/HandleInviteLink';
import InviteForm from 'domains/Invite/InviteForm';

import history from 'utils/history';
import { addRoutes } from './utils';

addRoutes([
    {
        path: '/townhalls',
        action: (ctx) => {
            const child = ctx.next();
            if (child) return child;
            return <TownhallList />;
        },
        children: [
            {
                path: '/:townhallId',
                action: (ctx) => {
                    const { townhallId } = ctx.params as { townhallId: string };
                    // default to the child, but show profile otherwise
                    const child = ctx.next() || <TownhallProfile />;
                    if (child)
                        return (
                            <TownhallProvider townhallId={townhallId}>
                                {child}
                            </TownhallProvider>
                        );
                    return (
                        <TownhallProvider townhallId={townhallId}>
                            <TownhallProfile />
                        </TownhallProvider>
                    );
                },
                // FIXME: make more in line with current routing changes
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
                            return <div />;
                        },
                    },
                    {
                        path: '/update', // /townhalls/:townhallId/update
                        action: () => {
                            return <div />;
                        },
                    },
                ],
            },
        ],
    },
]);
