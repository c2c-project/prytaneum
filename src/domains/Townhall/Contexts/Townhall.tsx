import React from 'react';
import type { Townhall } from 'prytaneum-typings';

import useEndpoint from 'hooks/useEndpoint';
import Loader from 'components/Loader';
import { getTownhall } from '../api';

interface Props {
    // TODO: add defaults here
    value?: Townhall; // we may not need this?
    children: JSX.Element | JSX.Element[];
    townhallId: string;
}

export const TownhallContext = React.createContext<Townhall>({
    _id: '',
    meta: {
        createdAt: new Date(),
        createdBy: {
            _id: '',
            name: {
                first: '',
                last: '',
            },
        },
        updatedAt: new Date(),
        updatedBy: {
            _id: '',
            name: {
                first: '',
                last: '',
            },
        },
    },
    state: {
        active: false,
        start: null,
        end: null,
        attendees: {
            max: 0,
            current: 0,
        },
    },
    form: {
        title: '',
        date: new Date(),
        description: '',
        // scope: 'district',
        private: false,
        // speaker: {
        //     name: '',
        //     party: '',
        //     territory: '',
        //     picture: '',
        // },
        topic: '',
    },
    settings: {
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
            enabled: false,
            list: [],
        },
        attachments: {
            enabled: false,
            list: [],
        },
        moderators: {
            list: [],
        },
        registration: {
            reminders: {
                enabled: true,
                customTimes: [],
            },
            registrants: [],
        },
        speakers: {
            list: [],
        },
    },
});

// TODO: optimize this so that a request doesn't get sent every single page load? maybe?
export default function TownhallProvider({
    value,
    children,
    townhallId,
}: Props) {
    const [townhall, setTownhall] = React.useState(value);
    const [get] = useEndpoint(() => getTownhall(townhallId), {
        onSuccess: (res) => {
            setTownhall(res.data);
        },
    });

    React.useEffect(() => {
        if (!townhall) {
            get();
        }
    }, [townhall, get]);

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
