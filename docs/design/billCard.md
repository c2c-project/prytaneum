#  Townhall Bill Summary

Will accept the following prop which consists of a summary text that can be revealed via the Material UI Collapse Component. 


Imagined Example Usage: 
```
            <Container maxWidth='sm' disableGutters>
            <BillSummary townhall={townhall} />
        </Container>
```

sample data
```
const townhall = {
    billName: 'Darth Vader',
    topic: 'Death Star Design & Imperial Unions',
    summaryText: 'Summary Text',
 
};

```