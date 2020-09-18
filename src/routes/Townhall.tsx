import React from 'react';

import TownhallList from 'pages/Townhall/TownhallList';
import TownhallProfile from 'pages/Townhall/TownhallProfile';
import TownhallProvider from 'domains/Townhall/Contexts/Townhall';

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
                path: '/:townhallId',
                action: (ctx) => {
                    const { townhallId } = ctx.params as { townhallId: string };
                    const child = ctx.next();
                    if (!child)
                        return (
                            <TownhallProvider townhallId={townhallId}>
                                <TownhallProfile townhallId={townhallId} />
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
                        action: (ctx) => {
                            return <Invite />;
                        },
                    },
                    {
                        path: '/settings',
                        action: (ctx) => {
                            return <Settings />;
                        },
                    },
                    {
                        path: '/update',
                        action: (ctx) => {
                            return <div />;
                        },
                    },
                ],
            },
            {
                path: '/create',
                action: () => {
                    return <div />;
                },
            },
        ],
    },
]);
