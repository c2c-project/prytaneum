#  Townhall History

Will accept the following prop which consists of array of objects containing action text, date, and avatar image


Imagined Example Usage: 
```
     <TownHallHistory townhall={townhall}></TownHallHistory>;
```

sample data
```
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

```