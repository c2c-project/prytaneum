import React from 'react';
import { useParams } from 'react-router-dom';

import useEndpoint from 'hooks/useEndpoint';
import Loader from 'components/Loader';
import { getTownhall } from '../api';
import { Townhall } from '../types';

interface Props {
    // TODO: add defaults here
    // eslint-disable-next-line react/require-default-props
    value?: Townhall;
    children: JSX.Element | JSX.Element[];
}

interface Params {
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
