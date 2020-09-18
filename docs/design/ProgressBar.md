# Progress Bar

Will accept the following prop which consists of an array of objects containing label, value, and a variable that shows the current value, where progress bar will stop at

Imagined Example Usage:

```
         return <Component timeline={timelineData} currentVal={50} />;

```

sample data

```
const timelineData: DataEntry[] = [
    {
        label: 'Introduced',
        value: 0,
    },
    {
        label: 'Under Vote',
        value: 50,
    },
    {
        label: 'Passed into Law',
        value: 100,
    },
];

```
