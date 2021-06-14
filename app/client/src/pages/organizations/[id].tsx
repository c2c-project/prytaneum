import * as React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useQueryLoader } from 'react-relay';

import { OrgProfileQuery } from '@local/__generated__/OrgProfileQuery.graphql';
import { Loader } from '@local/components/Loader';
import { OrgProfile, ORG_PROFILE } from '@local/features/organizations';

const Page: NextPage = () => {
    const router = useRouter();
    const { id } = router.query as { id: string }; // guaranteed as part of the file name
    const [queryRef, loadQuery] = useQueryLoader<OrgProfileQuery>(ORG_PROFILE);

    React.useEffect(() => {
        if (router.isReady) loadQuery({ id });
    }, [router.isReady, id, loadQuery]);

    if (!router.isReady || !queryRef) return <Loader />;

    return (
        <React.Suspense fallback='loading..'>
            <OrgProfile queryRef={queryRef} />
        </React.Suspense>
    );
};

export default Page;
