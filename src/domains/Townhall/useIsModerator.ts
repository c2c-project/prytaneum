import React from 'react';

import useUser from 'hooks/useUser';
import { TownhallContext } from 'contexts/Townhall';

export default function useIsModerator() {
    const [user] = useUser();
    const townhall = React.useContext(TownhallContext);
    const isModerator = React.useMemo(
        () =>
            (user &&
                townhall.settings.moderators.list.some(
                    ({ email }) => email === user.email.address
                )) ||
            townhall.meta.createdBy._id === user?._id,
        [townhall, user]
    );

    return isModerator;
}
