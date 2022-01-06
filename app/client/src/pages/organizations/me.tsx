import * as React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useQueryLoader } from 'react-relay';

import { OrgListQuery } from '@local/__generated__/OrgListQuery.graphql';
import { ORG_LIST_QUERY, OrgList } from '@local/features/organizations';
import { useIsClient } from '@local/features/core';
import { Loader } from '@local/components/Loader';
import { useUser } from '@local/features/accounts';

const Page: NextPage = () => {
    const router = useRouter();
    const [queryRef, loadQuery] = useQueryLoader<OrgListQuery>(ORG_LIST_QUERY);
    const isClient = useIsClient();
    const [user,,isLoading] = useUser();

    React.useEffect(() => {
        if (isClient) loadQuery({});
    }, [isClient, loadQuery]);

    React.useEffect(() => {
        if (!isLoading && !user) router.push('/');
    }, [user, router, isLoading]);

    if (!queryRef) return <Loader />;

    return (
        <React.Suspense fallback='loading...'>
            <OrgList queryRef={queryRef} />
        </React.Suspense>
    );
};

export default Page;
