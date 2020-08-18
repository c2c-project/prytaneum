import React from 'react';
import faker from 'faker';

import FixtureContext, { makeSuccessFixture } from 'mock/Fixtures';
import Component from '.';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { ActionStep } from './ActionHistory';

export default { title: 'Domains/Townhall' };

const townhall = [
    {
        action: 'Inbox',
        link : 'https://i.imgur.com/3beQH5s.jpeg',
        date: "Jan 9, 2014",
    },
    {
        action: 'Drafts',
        link : 'https://i.imgur.com/3beQH5s.jpeg',
        date: "Jan 10, 2015"
    },
    {
        action: 'Trash',
        link : 'https://i.imgur.com/3beQH5s.jpeg',
        date: "Jan 11, 2016"
    },
    {
        action: 'Spam',
        link : 'https://i.imgur.com/3beQH5s.jpeg',
        date: "Jan 12, 2017"
    },
];

export function ActionHistoryList() {
    return <Component townhall={townhall}></Component>;
}
