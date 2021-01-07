import React from 'react';
import { CardHeader, IconButton, Card, CardActions } from '@material-ui/core';

import NextIcon from '@material-ui/icons/SkipNext';
import PrevIcon from '@material-ui/icons/SkipPrevious';

interface Props {
    onClickNext: () => void;
    onClickPrev: () => void;
    className: string;
}

/**
 * ui for controlling the question queue
 */
export default React.memo(({ onClickNext, onClickPrev, className }: Props) => {
    return (
        <Card className={className}>
            <CardHeader title='Controls' />
            <CardActions>
                <IconButton onClick={onClickPrev}>
                    <PrevIcon />
                </IconButton>
                <IconButton onClick={onClickNext}>
                    <NextIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
});
