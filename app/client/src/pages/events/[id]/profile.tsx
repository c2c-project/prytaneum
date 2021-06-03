/* eslint-disable react/prop-types */
import * as React from 'react';
import { NextPage, GetServerSidePropsContext } from 'next';
import { fetchQuery, graphql } from 'react-relay';

import type { profileQuery, profileQueryResponse } from '@local/__generated__/profileQuery.graphql';
import { initEnvironment } from '@local/utils/relay-environment';
import { initializeStore } from '@local/reducers/store';
import { PickRequired } from '@local/utils/ts-utils';
import { EventProfile } from '@local/features/events';

function doesCtxHaveId(
    ctx: GetServerSidePropsContext<{ id?: string }>
): ctx is PickRequired<GetServerSidePropsContext<{ id: string }>, 'params'> {
    return ctx?.params?.id !== undefined;
}

const EVENT_PROFILE_QUERY = graphql`
    query profileQuery($id: ID!) {
        node(id: $id) {
            id
            ... on Event {
                ...EventProfileFragment
            }
        }
    }
`;

export async function getServerSideProps(ctx: GetServerSidePropsContext<{ id: string }>) {
    const reduxStore = initializeStore();
    const baseProps = {
        initialReduxState: reduxStore.getState(),
        hideSideNav: true,
        containerProps: { maxWidth: 'xl' },
    };
    if (!doesCtxHaveId(ctx)) return { props: baseProps };
    const environment = initEnvironment();
    const queryProps = await fetchQuery<profileQuery>(environment, EVENT_PROFILE_QUERY, {
        id: ctx.params.id,
    }).toPromise();
    const initialRecords = environment.getStore().getSource().toJSON();
    return { props: { ...baseProps, ...queryProps, initialRecords } };
}

const ProfilePage: NextPage<profileQueryResponse> = ({ node }) => {
    if (!node) {
        return <div>loading...</div>;
    }
    return <EventProfile fragmentRef={node} />;
};

export default ProfilePage;
