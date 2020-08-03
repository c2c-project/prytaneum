import React from 'react';
import Component from './Progress';


export default { title: 'Components' };
const data = [
    {
        value: 0,
        label: 'Introduced',
    },
    {
        value: 50,
        label: 'Passed in houses',
    },

    {
        value: 100,
        label: "Became Law",
    },
];
export function Progress() {
    return <Component townhall={data} />;
}
