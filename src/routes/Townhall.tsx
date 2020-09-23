import React from 'react';

import TownhallList from 'pages/Townhall/TownhallList';
import TownhallProfile from 'pages/Townhall/TownhallProfile';
import TownhallProvider from 'domains/Townhall/Contexts/Townhall';

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
            },
        ],
    },
]);
