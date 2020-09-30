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
    form: {
        title: '',
        date: new Date(),
        description: '',
    },
    settings: {
        general: {
            private: false,
            speaker: {
                name: '',
                party: '',
                territory: '',
                picture: '',
            },
            topic: '',
        },
        components: {
            waitingRoom: {
                enabled: false,
                scheduled: null,
            },
            chat: {
                enabled: false,
                automated: false,
            },
            questionQueue: {
                transparent: false,
                automated: false,
            },
            credits: {
                enabled: true,
            },
            links: {
                enabled: false,
                links: [],
            },
            moderators: {
                list: [],
                primary: '',
            },
        },
    },
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
    }, [townhall, get]);

    return !townhall ? (
        <div style={{ height: '500px' }}>
            <Loader />
        </div>
    ) : (
        <TownhallContext.Provider value={townhall}>
            {children}
        </TownhallContext.Provider>
    );
}

TownhallProvider.defaultProps = {
    value: undefined,
};
