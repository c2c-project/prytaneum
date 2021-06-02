import * as React from 'react';
import { NextPage } from 'next';
import { useQueryLoader } from 'react-relay';

import { OrgListQuery } from '@local/__generated__/OrgListQuery.graphql';
import { ORG_LIST_QUERY, OrgList } from '@local/features/organizations';
import { useIsClient } from '@local/hooks';
import { Loader } from '@local/components/Loader';

const Page: NextPage = () => {
    const [queryRef, loadQuery] = useQueryLoader<OrgListQuery>(ORG_LIST_QUERY);
    const isClient = useIsClient();
    React.useEffect(() => {
        if (isClient) loadQuery({});
    }, [isClient, loadQuery]);

    // TODO: something better than this?
    if (!queryRef) return <Loader />;

    return (
        <React.Suspense fallback='loading...'>
            <OrgList queryRef={queryRef} />
        </React.Suspense>
    );
};

export default Page;
