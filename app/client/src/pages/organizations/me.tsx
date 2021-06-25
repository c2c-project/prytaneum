import * as React from 'react';
import { NextPage } from 'next';
import { useQueryLoader } from 'react-relay';

import { OrgListQuery } from '@local/__generated__/OrgListQuery.graphql';
import { ORG_LIST_QUERY, OrgList } from '@local/features/organizations';
import { useIsClient } from '@local/features/core';
import { Loader } from '@local/components/Loader';
import { useUser } from '@local/features/accounts';

const Page: NextPage = () => {
    const [queryRef, loadQuery] = useQueryLoader<OrgListQuery>(ORG_LIST_QUERY);
    const isClient = useIsClient();
    const [user] = useUser();
    React.useEffect(() => {
        if (isClient) loadQuery({});
    }, [isClient, loadQuery]);
    if (!user) {
        return (
            <div>
                <p>Please log in.</p>
            </div>
        );
    }
    // TODO: something better than this?
    if (!queryRef) return <Loader />;

    return (
        <React.Suspense fallback='loading...'>
            <OrgList queryRef={queryRef} />
        </React.Suspense>
    );
};

export default Page;
