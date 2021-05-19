import * as React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { Event as OrgEvent, useEventSettingsLazyQuery } from '@local/graphql-types';
import { EventSettings, EventProvider } from '@local/features/events';

const Page: NextPage = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };

    const [eventDetails, setEventDetails] = React.useState<OrgEvent | undefined>();
    const [query, { loading: isLoading, called }] = useEventSettingsLazyQuery({
        variables: { input: id },
        onCompleted(results) {
            if (results.eventById) setEventDetails(results.eventById);
        },
        fetchPolicy: 'no-cache',
    });
    React.useEffect(() => {
        if (router.isReady && !called) {
            query();
        }
    }, [router.isReady, query, called]);

    if (isLoading || !router.isReady || !eventDetails) return <div>Loading...</div>;

    return (
        <EventProvider event={eventDetails}>
            <EventSettings />
        </EventProvider>
    );
};

export default Page;
