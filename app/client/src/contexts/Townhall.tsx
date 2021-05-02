import React, { SetStateAction } from 'react';
import type { Townhall } from 'prytaneum-typings';

import useEndpoint from 'hooks/useEndpoint';
import Loader from 'components/Loader';
import useIsMounted from 'hooks/useIsMounted';
import { getTownhall } from 'domains/Townhall/api';

interface Props {
    value?: Townhall; // we may not need this?
    children: React.ReactNode | React.ReactNodeArray;
    townhallId: string;
    /**
     * intended for storybook
     */
    forceNoFetch?: boolean;
}

export const TownhallContext = React.createContext<Townhall | null>(null);

type Dispatch = React.Dispatch<SetStateAction<Townhall | undefined >>  | null;

export const TownhallDispatch = React.createContext<Dispatch>(null);



// TODO: optimize this so that a request doesn't get sent every single page load? maybe?
export default function TownhallProvider({ value, children, townhallId, forceNoFetch }: Props) {
    const [townhall, setTownhall] = React.useState(value);
    const [getIsMounted] = useIsMounted();
    const [run, isLoading, getHasRun] = useEndpoint(() => getTownhall(townhallId), {
        onSuccess: (res) => {
            if (!getIsMounted()) return;
            setTownhall(res.data);
        },
        minWaitTime: 0,
    });

    React.useEffect(() => {
        if (!townhall && !getHasRun() && !forceNoFetch) run();
    }, [townhall, getHasRun, run, forceNoFetch]);

    // TODO: some sort of redirect if there's no townhall
    // "something broke try refreshing" page?
    if (isLoading || !townhall) return <Loader />;

    return (
        <TownhallContext.Provider value={townhall}>
            <TownhallDispatch.Provider value={setTownhall}>{children}</TownhallDispatch.Provider>
        </TownhallContext.Provider>
    );
}

TownhallProvider.defaultProps = {
    value: null,
    forceNoFetch: false,
};
