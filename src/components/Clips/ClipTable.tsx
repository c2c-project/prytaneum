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
    tags: string[];
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

interface Props {
    clips: ClipData[];
    isSelected: (title: string) => boolean;
    handleClick: (event: React.MouseEvent<unknown>, clip: ClipData) => void;
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


export default function ClipTable({clips, isSelected, handleClick}: Props) {
    const classes = useStyles();

    

    
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
                    {clips.map((row) => {
                        const isRowSelected = isSelected(row.title);
                        return (
                            <TableRow
                                hover
                                key={row.title}
                                onClick={(event) => {
                                    handleClick(event, row);
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
