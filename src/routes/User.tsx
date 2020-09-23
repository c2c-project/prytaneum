import React from 'react';

import history from 'utils/history';

import Login from 'pages/Auth/Login';
import TownhallContextProvider from 'domains/Townhall/Contexts/Townhall';
import TownhallList from 'pages/Townhall/TownhallList';
import TownhallForm from 'pages/Townhall/TownhallForm';
import { addRoutes } from './utils';

const Settings = () => {
    return <div />;
};

const Invite = () => {
    return <div />;
};

addRoutes([
    {
        // user id is the currently logged in user only
        path: '/user',
        action: (ctx) => {
            return ctx.next();
        },
        children: [
            {
                path: '/my-townhalls',
                action: (ctx) => {
                    const child = ctx.next();
                    if (child) return child;
                    // TODO: real user id here
                    return <TownhallList userId='123' />;
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
                            const component = ctx.next() || <Settings />;

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
                                path: '/update',
                                action: () => <h1>TODO</h1>,
                            },
                            {
                                path: '/settings',
                                action: () => {
                                    return <Settings />;
                                },
                            },
                            {
                                path: '/invite',
                                action: () => {
                                    return <Invite />;
                                },
                            },
                        ],
                    },
                ],
            },
            {
                path: '/settings',
                action: () => <h1>TODO: User profile</h1>,
            },
        ],
    },
]);
