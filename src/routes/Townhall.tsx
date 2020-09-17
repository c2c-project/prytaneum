import React from 'react';

import TownhallList from 'pages/Townhall/TownhallList';
import TownhallProfile from 'pages/Townhall/TownhallProfile';

import { addRoutes } from './utils';

const TownhallContext = React.createContext({});

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
                            <TownhallContext.Provider value={{}}>
                                <TownhallProfile townhallId={townhallId} />
                            </TownhallContext.Provider>
                        );
                    return (
                        <TownhallContext.Provider value={{}}>
                            {child}
                        </TownhallContext.Provider>
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
                ],
            },
        ],
    },
]);
