import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Checkbox from '@material-ui/core/Checkbox';
import theme from 'theme';

const useStyles = makeStyles(() => ({
    selectedRow: {
        backgroundColor: '#808080',
    },
    row: {
        backgroundColor: '#000000',
    },
}));

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
    createData(
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

// interface EnhancedTableProps {414
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
    const [selected, setSelected] = React.useState<string[]>([]);

    useEffect(() => {
        console.log(selected);
    }, [selected]);

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        // adds and pops items that are clicked/unclicked to selected list state
        const selectedIndex = selected.indexOf(name);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };
    // returns boolean if title has been selected
    const isSelected = (title: string) => selected.indexOf(title) !== -1;

    const matches = useMediaQuery('(min-width:300px)');

    return !matches ? (
        <h1>smaller than min width</h1>
    ) : (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='clip table'>
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>Clips</TableCell>
                        <TableCell align='left'>Title</TableCell>
                        <TableCell align='center'>Options</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tempRows.map((row) => {
                        const isRowSelected = isSelected(row.title);
                        return (
                            <TableRow
                                hover
                                key={row.title}
                                onClick={(event) => {
                                    handleClick(event, row.title);
                                }}
                                selected={isRowSelected}
                            >
                                <TableCell padding='checkbox'>
                                    <Checkbox
                                        checked={isRowSelected}
                                        style={{
                                            visibility: isRowSelected
                                                ? 'visible'
                                                : 'hidden',
                                        }}
                                    />
                                </TableCell>
                                <TableCell
                                    component='th'
                                    scope='row'
                                    align='left'
                                >
                                    {row.title}
                                </TableCell>
                                <TableCell
                                    component='th'
                                    scope='row'
                                    align='center'
                                >
                                    <button type='button'>options</button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
