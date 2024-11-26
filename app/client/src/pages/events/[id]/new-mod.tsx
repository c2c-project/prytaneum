import { Fragment } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';

import { ConditionalRender, Loader } from '@local/components';
import { PreloadedEventLiveNewModratorView } from '@local/features/events/ModeratorView/EventLiveNewModeratorView';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const baseProps = {
        hideSideNav: true,
        containerProps: { maxWidth: '100%' },
        disablePadding: true,
    };
    const eventId = ctx.params?.id as string;

    return { props: { ...baseProps, eventId } };
}

const Mod: NextPage<{ eventId: string }> = ({ eventId }) => {
    return (
        <Fragment>
            <ConditionalRender client>
                <PreloadedEventLiveNewModratorView eventId={eventId} />
            </ConditionalRender>
            <ConditionalRender server>
                <Loader />
            </ConditionalRender>
        </Fragment>
    );
};

export default Mod;
