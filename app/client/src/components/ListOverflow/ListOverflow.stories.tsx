import * as React from 'react';
import { makeUsers } from 'mock/handlers/auth';
import ListOverflow from './ListOverflow';

export default { title: '@local/components/ListOverflow' };

const usersPrimary = makeUsers(10).map((user) => {
    return { _id: user._id, primary: user.email.address };
});

export function Primary() {
    return <ListOverflow rowProps={usersPrimary} />;
}

export function Secondary() {
    return (
        <ListOverflow
            rowProps={usersPrimary.map((user) => {
                return { ...user, secondary: 'regular' };
            })}
        />
    );
}

export function Empty() {
    return <ListOverflow rowProps={[]} />;
}
