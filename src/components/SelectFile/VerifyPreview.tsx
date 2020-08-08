/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

function NoPreviewMessage() {
    return (
        <Typography variant='h5'>
            No Preview Available. Please go back and select a file.
        </Typography>
    );
}

interface Props {
    data: Array<object>;
    expectedKeys: Array<string>;
}

const getValue: Function = <T extends object, U extends keyof T>(obj: T) => (
    key: U
) => obj[key];

function PreviewTable({ data, expectedKeys }: Props) {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    {expectedKeys.map((key: string) => (
                        <TableCell key={key}>{key}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((row: object, idx) => (
                    <TableRow key={idx}>
                        {expectedKeys.map((key: string) => (
                            <TableCell key={`${idx}-${key}`}>
                                {getValue(row)(key) || 'Error!'}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

PreviewTable.propTypes = {
    expectedKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
    data: PropTypes.array.isRequired,
};

function Preview(props: Props) {
    const { data } = props;
    // eslint-disable-next-line react/jsx-props-no-spreading
    return data.length > 0 ? <PreviewTable {...props} /> : <NoPreviewMessage />;
}

Preview.defaultProps = {
    data: [],
};

Preview.propTypes = {
    data: PropTypes.array,
};

export default Preview;
