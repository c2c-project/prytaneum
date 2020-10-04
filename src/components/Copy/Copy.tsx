import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import CopyIcon from '@material-ui/icons/ContentCopy';

import useCopy from 'hooks/useCopy';

interface Props {
    data: string;
    className?: string;
}

// NOTE: may be better as a hook? useClipboard?
export default function Copy({ data, className }: Props) {
    const [copy] = useCopy();

    return (
        <div className={className}>
            <Tooltip title='Copy' aria-label='copy'>
                <IconButton onClick={() => copy(data)} edge='end'>
                    <CopyIcon />
                </IconButton>
            </Tooltip>
        </div>
    );
}

Copy.defaultProps = {
    className: undefined,
};
