// import { v4 as uuidv4 } from "uuid";

export const headerData = [
    { id: 'userName', label: 'Name' },
    { id: 'userStatus', label: 'Status' },
    { id: 'dateUpdated', label: 'Timestamp' },
    { id: 'actions', label: 'Actions' },
];

export const statusPromotion = ['Organizer', 'Moderator'];

export const statusTags = [
    'admin',
    'moderator',
    'organizer',
    'regular',
    'banned',
];

export const userProfileData = {
    id: 1,
    name: 'Francisco Gallego',
    email: 'francisco.gallego@devias.io',
    status: [
        { status: 'Admin', count: 1 },
        { status: 'Attended', count: 4 },
        { status: 'Moderated', count: 1 },
        { status: 'Banned', count: 3 },
        { status: 'Organized', count: 2 },
    ],
    timeStamp: 1565016400000,
    actionHistoryData: [
        { timeStamp: '1565016400000', action: 'Banned in TownHall X' },
        { timeStamp: '1565016400001', action: 'Banned in TownHall Y' },
        { timeStamp: '1565016400002', action: 'Made Townhall T' },
        { timeStamp: '565016400003', action: 'Reset Password' },
        { timeStamp: '1565016400000', action: 'Banned in TownHall X' },
        { timeStamp: '1565016400001', action: 'Banned in TownHall Y' },
        { timeStamp: '1565016400002', action: 'Made Townhall T' },
        { timeStamp: '565016400003', action: 'Reset Password' },
        { timeStamp: '1565016400000', action: 'Banned in TownHall X' },
        { timeStamp: '1565016400001', action: 'Banned in TownHall Y' },
        { timeStamp: '1565016400002', action: 'Made Townhall T' },
        { timeStamp: '565016400003', action: 'Reset Password' },
        { timeStamp: '1565016400000', action: 'Banned in TownHall X' },
        { timeStamp: '1565016400001', action: 'Banned in TownHall Y' },
        { timeStamp: '1565016400002', action: 'Made Townhall T' },
        { timeStamp: '565016400003', action: 'Reset Password' },
    ],
};

export const mockData = [
    {
        id: 1,
        name: 'Francisco Gallego',
        email: 'francisco.gallego@devias.io',
        status: 'admin',
        timeStamp: 1565016400000,
    },
    {
        id: 2,
        name: 'Ekaterina Tankova',
        email: 'ekaterina.tankova@devias.io',
        status: 'moderator',
        timeStamp: 1555016400000,
    },
    {
        id: 3,
        name: 'Cao Yu',
        email: 'cao.yu@devias.io',
        status: 'regular',
        timeStamp: 1555016400000,
    },
    {
        id: 4,
        name: 'Alexa Richardson',
        email: 'alexa.richardson@devias.io',
        status: 'moderator',
        timeStamp: 1555016400000,
    },
    {
        id: 5,
        name: 'Anje Keizer',
        email: 'anje.keizer@devias.io',
        status: 'organizer',
        timeStamp: 1554930000000,
    },
    {
        id: 6,
        name: 'Clarke Gillebert',
        email: 'clarke.gillebert@devias.io',
        status: 'organizer',
        timeStamp: 1554757200000,
    },
    {
        id: 7,
        name: 'Adam Denisov',
        email: 'adam.denisov@devias.io',
        status: 'organizer',
        timeStamp: 1554670800000,
    },
    {
        id: 8,
        name: 'Ava Gregoraci',
        email: 'ava.gregoraci@devias.io',
        status: 'regular',
        timeStamp: 1554325200000,
    },
    {
        id: 9,
        name: 'Emilee Simchenko',
        email: 'emilee.simchenko@devias.io',
        status: 'regular',
        timeStamp: 1523048400000,
    },
    {
        id: 10,
        name: 'Kwak Seong-Min',
        status: 'regular',
        phone: '313-812-8947',
    },
    {
        id: 11,
        name: 'Merrile Burgett',
        email: 'merrile.burgett@devias.io',
        status: 'regular',
        timeStamp: 1522702800000,
    },
];
