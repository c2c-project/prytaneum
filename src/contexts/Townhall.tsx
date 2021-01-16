import React from 'react';
import type { Townhall } from 'prytaneum-typings';

import useEndpoint from 'hooks/useEndpoint';
import Loader from 'components/Loader';
import useIsMounted from 'hooks/useIsMounted';
import { getTownhall } from 'domains/Townhall/api';

interface Props {
    // TODO: add defaults here
    value?: Townhall; // we may not need this?
    children: React.ReactNode | React.ReactNodeArray;
    townhallId: string;
}

export const TownhallContext = React.createContext<Townhall | null>(null);

// TODO: optimize this so that a request doesn't get sent every single page load? maybe?
export default function TownhallProvider({
    value,
    children,
    townhallId,
}: Props) {
    const [townhall, setTownhall] = React.useState(value);
    const [getIsMounted] = useIsMounted();
    const [run, isLoading, getHasRun] = useEndpoint(
        () => getTownhall(townhallId),
        {
            onSuccess: (res) => {
                if (!getIsMounted()) return;
                setTownhall(res.data);
            },
        }
    );

    React.useEffect(() => {
        if (!townhall && !getHasRun()) run();
    }, [townhall, getHasRun, run]);

    // TODO: some sort of redirect if there's no townhall
    // "something broke try refreshing" page?
    if (isLoading || !townhall) return <Loader />;

    return (
        <TownhallContext.Provider value={townhall}>
            {children}
        </TownhallContext.Provider>
    );
}

TownhallProvider.defaultProps = {
    value: null,
};
