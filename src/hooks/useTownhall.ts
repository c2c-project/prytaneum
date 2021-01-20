import React from 'react';

import { TownhallContext } from 'contexts/Townhall';
import useUser from './useUser';

export default function useTownhall() {
    const [user] = useUser();
    const townhall = React.useContext(TownhallContext);

    // null if townhall context not used, will never be undefined because I only display a loader if townhall does not exist
    // TODO: what if no townhall found??
    if (!townhall)
        throw new Error('useTownhall() must be used within a TownhallContext');

    const isOwner = React.useMemo(
        () => user && townhall.meta.createdBy._id === user._id,
        [user, townhall]
    );
    const isModerator = React.useMemo(
        () =>
            Boolean(
                (user &&
                    townhall.settings.moderators.list.some(
                        ({ email }) => email === user.email.address
                    )) ||
                    isOwner
            ),
        [townhall, user, isOwner]
    );
    return [townhall, isModerator] as const;
}
