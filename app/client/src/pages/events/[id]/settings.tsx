import * as React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { Event as OrgEvent, useEventSettingsQuery } from '@local/graphql-types';
import { EventSettings } from '@local/features/events';

const Page: NextPage = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };

    const [eventDetails, setEventDetails] = React.useState<OrgEvent | undefined>();
    const { loading: isLoading } = useEventSettingsQuery({
        variables: { input: id },
        onCompleted(results) {
            if (results.eventById) setEventDetails(results.eventById);
        },
    });

    if (isLoading || !eventDetails) return <div>Loading...</div>;

    return <EventSettings event={eventDetails} />;
};

export default Page;
