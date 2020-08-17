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
    },
    {
        action: 'Drafts',
        link : 'https://i.imgur.com/3beQH5s.jpeg',
    },
    {
        action: 'Trash',
        link : 'https://i.imgur.com/3beQH5s.jpeg',
    },
    {
        action: 'Spam',
        link : 'https://i.imgur.com/3beQH5s.jpeg',
    },
];

export function ActionHistoryList() {
    return <Component townhall={townhall}></Component>;
}
