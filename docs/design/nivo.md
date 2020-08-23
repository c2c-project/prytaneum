# Nivo Pie
Will accept the following prop which will contain an array of graph data as well as the initial height of the container around the component


Imagined Example Usage: 
```
        <Container>
            <NivoPie townhall={townhall} />
        </Container>
```

sample data
```
const townhall = {
    graphHeight: 500,
    graphData: [
        {
            id: 'php',
            label: 'php',
            value: 344,
            color: 'hsl(312, 70%, 50%)',
        },
        {
            id: 'go',
            label: 'go',
            value: 262,
            color: 'hsl(244, 70%, 50%)',
        },
        {
            id: 'javascript',
            label: 'javascript',
            value: 411,
            color: 'hsl(320, 70%, 50%)',
        },
        {
            id: 'ruby',
            label: 'ruby',
            value: 191,
            color: 'hsl(305, 70%, 50%)',
        },
        {
            id: 'hack',
            label: 'hack',
            value: 234,
            color: 'hsl(230, 70%, 50%)',
        },
    ],
};
```