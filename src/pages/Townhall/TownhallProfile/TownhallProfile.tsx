import React from 'react';

import Component from 'domains/Townhall/TownhallProfile';

interface Props {
    townhallId: string;
}

export default function TownhallProfile({ townhallId }: Props) {
    return <Component townhallId={townhallId} />;
}
