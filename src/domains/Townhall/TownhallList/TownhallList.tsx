import React from 'react';

import useEndpoint from 'hooks/useEndpoint';
import Loader from 'components/Loader';
import SectionList, { Section, Datum } from 'components/SectionList';
import { formatDate } from 'utils/format';

import { getTownhallList } from '../api';
import { Townhall } from '../types';

function formatSections(list: Townhall[]): Section[] {
    interface Intermediate {
        [index: string]: Datum[];
    }
    const intermediateVal: Intermediate = list.reduce<Intermediate>(
        (accum, townhall) => {
            const formattedDate = formatDate(new Date(townhall.date), 'P');
            const copy = { ...accum };
            const datum: Datum = {
                image: townhall.picture,
                title: townhall.speaker.name,
                subtitle: `${townhall.speaker.party}, ${townhall.speaker.territory}`,
            };
            if (copy[formattedDate] !== undefined) {
                copy[formattedDate].push(datum);
            } else {
                copy[formattedDate] = [datum];
            }
            return copy;
        },
        {}
    );
    return Object.keys(intermediateVal).map((key) => {
        const datums: Datum[] = intermediateVal[key];
        return { title: key, sectionData: datums };
    });
}

export default function TownhallList() {
    const [list, setList] = React.useState<Townhall[] | null>(null);
    // const isMounted = React.useRef(true);
    // const renderCount = React.useRef(0);
    const [sendRequest, isLoading] = useEndpoint(getTownhallList, {
        onSuccess: (results) => {
            // if (isMounted.current) {
            setList(results.data.list);
            // }
        },
    });

    React.useEffect(sendRequest, []);
    if (isLoading || !list) {
        return <Loader />;
    }

    // React.useEffect(() => {
    //     renderCount.current += 1;
    // });

    // React.useEffect(() => {
    //     isMounted.current = true;
    //     sendRequest();
    //     return () => {
    //         isMounted.current = false;
    //     };
    // }, [sendRequest]);
    // if (renderCount.current < 1 || isLoading) {
    //     return <Loader />;
    // }
    return <SectionList sections={formatSections(list)} />;
}
