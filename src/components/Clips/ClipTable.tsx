import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

interface ClipData {
    timeStamp: string;
    duration: string;
    title: string;
    description: string;
    tags?: string[];
}

function createData(
    timeStamp: string,
    duration: string,
    title: string,
    description: string,
    tags: string[]
): ClipData {
    return { timeStamp, duration, title, description, tags };
}

const tempRows = [
    createData(
        '00:40-1:53',
        '1 min, 23 secs',
        'Question title 1',
        'Session Title',
        ['History', 'Philosophy', 'Prop 60']
    ),
    createData(
        '1:34-2:23',
        '1 min, 23 secs',
        'Question title 2',
        'Session Title',
        ['History', 'A.I']
    ),
    createData(
        '3:40-5:00',
        '1 min, 23 secs',
        'Question title 3',
        'Session Title',
        ['History', 'Philosophy', 'Prop 60']
    ),
    createTimeStamp	Clip Title	Tags/Subject	Options
    00:40-1:53	Question title 1ata(
        '00:40-1:53',
        '1 min, 23 secs',
        'Question title 4',
        'Session Title',
        ['History', 'Philosophy', 'Prop 60']
    ),
    createData(
        '00:40-1:53',
        '1 min, 23 secs',
        'Question title 5',
        'Session Title',
        ['History', 'Philosophy', 'Prop 60']
    ),
];

// function descendingComparator<T>(a: T, b: T, orderBy: keyof T){
//     if (b[orderBy] < a[orderBy]){
//         return -1;
//     }
//     if (b[orderBy] > a[orderBy]){
//         return 1;
//     }
//     return 0;
// }

// type Order = 'asc' | 'desc';

// interface EnhancedTableProps {
//     classes: ReturnType<typeof useStyles>;
//     numSelected: number;
//     onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ClipData) => void;
//     onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
//     order: Order;
//     orderBy: string;
//     rowCount: number;
//   }

export default function ClipTable() {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='clip table'>
                <TableHead>
                    <TableRow>
                        <TableCell>TimeStamp</TableCell>
                        <TableCell>Clip Title</TableCell>
                        <TableCell>Tags/Subject</TableCell>
                        <TableCell>Options</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tempRows.map((row) => (
                        <TableRow key={row.title}>
                            <TableCell component='th' scope='row'>
                                {row.timeStamp}
                            </TableCell>
                            <TableCell component='th' scope='row'>
                                {row.title}
                            </TableCell>
                            <TableCell component='th' scope='row'>
                                {!row.tags ? row.tags : row.tags[0]}
                            </TableCell>
                            <TableCell component='th' scope='row'>
                                <button type='button'>options</button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
