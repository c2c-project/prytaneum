import React from 'react';

import List from 'domains/Townhall/TownhallList';

// TODO: re-evaluate if this file is even needed
interface Props {
    userId?: string;
}

export default function TownhallList({ userId }: Props) {
    return <List userId={userId} />;
}

TownhallList.defaultProps = {
    userId: undefined,
};
