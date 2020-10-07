import React from 'react';
import { makeUsers } from 'mock/handlers/auth';
import ListOverflow from './ListOverflow';

export default { title: 'Components/ListOverflow' };

const usersPrimary = makeUsers(10).map((user) => {
    return { _id: user._id, primary: user.email.address };
});

export function Primary() {
    return <ListOverflow rowTraits={usersPrimary} />;
}

export function Secondary() {
    return (
        <ListOverflow
            rowTraits={usersPrimary.map((user) => {
                return { ...user, secondary: 'regular' };
            })}
        />
    );
}

export function Empty() {
    return <ListOverflow rowTraits={[]} />;
}
