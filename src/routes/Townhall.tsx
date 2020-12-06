import React from 'react';

import RequireLogin from 'components/RequireLogin';
import Page from 'layout/Page';
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
            return (
                <RequireLogin>
                    <Page>
                        <TownhallList />
                    </Page>
                </RequireLogin>
            );
        },
        children: [
            {
                path: '/:townhallId',
                action: (ctx) => {
                    const { townhallId } = ctx.params as { townhallId: string };
                    // default to the child, but show profile otherwise
                    const child = ctx.next() || <TownhallProfile />;

                    return (
                        <TownhallProvider townhallId={townhallId}>
                            {child}
                        </TownhallProvider>
                    );
                },
                // FIXME: make more in line with current routing changes
                children: [
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
