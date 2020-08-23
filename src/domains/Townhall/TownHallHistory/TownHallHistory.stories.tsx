import React from 'react';
import Component from '.';


export default { title: 'Domains/Townhall' };

const townhall = [
    {
        action: 'Inbox',
        link: 'https://i.imgur.com/3beQH5s.jpeg',
        date: 'Jan 9, 2014',
    },
    {
        action: 'Drafts',
        link: 'https://i.imgur.com/3beQH5s.jpeg',
        date: 'Jan 10, 2015',
    },
    {
        action: 'Trash',
        link: 'https://i.imgur.com/3beQH5s.jpeg',
        date: 'Jan 11, 2016',
    },
    {
        action: 'Spam',
        link: 'https://i.imgur.com/3beQH5s.jpeg',
        date: 'Jan 12, 2017',
    },
];

export function TownhallHistory() {
    return <Component townhall={townhall}></Component>;
}
