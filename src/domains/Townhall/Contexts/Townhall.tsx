import React from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'components/Loader';

import useEndpoint from 'hooks/useEndpoint';
import { Townhall, getTownhall } from '../api';

interface Props {
    value?: Townhall;
    children: JSX.Element | JSX.Element[];
}

interface Params {
    townhallId: string;
}

// this is dangerous to cast an empty object as a townhall, but my component below gaurantees it will always be defined
export const TownhallContext = React.createContext<Townhall>({} as Townhall);

export default function TownhallProvider({ value, children }: Props) {
    const { townhallId } = useParams<Params>();
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
    value: {},
};
