import React from 'react';

import List from 'domains/Townhall/TownhallList';

// TODO: re-evaluate if this file is even needed
interface Props {
    currentUser?: boolean;
}

export default function TownhallList({ currentUser }: Props) {
    return <List currentUser={currentUser} />;
}

TownhallList.defaultProps = {
    currentUser: false,
};
