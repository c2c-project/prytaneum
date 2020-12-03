import React from 'react';
import type { User } from 'prytaneum-typings';

import RequireLogin from 'components/RequireLogin';
import UserProvider from 'contexts/User';

import TownhallProvider from 'domains/Townhall/Contexts/Townhall';
import TownhallLive from 'domains/Townhall/TownhallLive';

import Page from 'layout/Page';

import { addRoutes } from './utils';

addRoutes([
    {
        path: '/preview',
        action: (ctx) => {
            return (
                <RequireLogin>
                    <Page maxWidth='xl'>{ctx.next()}</Page>
                </RequireLogin>
            );
        },
        children: [
            {
                path: '/:townhallId',
                action: (ctx) => {
                    // FIXME: typings for this kinda suck
                    const query = ctx.query as User;
                    const { townhallId } = ctx.params as { townhallId: string };
                    return (
                        <UserProvider value={{ ...query }}>
                            <TownhallProvider townhallId={townhallId}>
                                <TownhallLive />
                            </TownhallProvider>
                        </UserProvider>
                    );
                },
            },
        ],
    },
]);
