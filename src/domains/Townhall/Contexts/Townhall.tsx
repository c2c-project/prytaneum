import React from 'react';

import useEndpoint from 'hooks/useEndpoint';
import Loader from 'components/Loader';
import { getTownhall } from '../api';
import { Townhall } from '../types';

interface Props {
    // TODO: add defaults here
    value?: Townhall; // we may not need this?
    children: JSX.Element | JSX.Element[];
    townhallId: string;
}

export const TownhallContext = React.createContext<Townhall>({
    _id: '',
    speaker: {
        name: '',
        party: '',
        territory: '',
    },
    moderator: '',
    topic: '',
    picture: '',
    readingMaterials: '',
    date: new Date(),
    url: '',
});

export default function TownhallProvider({
    value,
    children,
    townhallId,
}: Props) {
    const [townhall, setTownhall] = React.useState(value);
    const [get] = useEndpoint(() => getTownhall(townhallId), {
        onSuccess: (res) => {
            const { townhall: fetchedTownhall } = res.data;
            setTownhall(fetchedTownhall);
        },
    });

    React.useEffect(() => {
        if (!townhall) {
            get();
        }
    }, []);

    return !townhall ? (
        <Loader />
    ) : (
        <TownhallContext.Provider value={townhall}>
            {children}
        </TownhallContext.Provider>
    );
}

TownhallProvider.defaultProps = {
    value: undefined,
};
