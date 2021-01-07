import React from 'react';
import {
    CardHeader,
    IconButton,
    Card,
    CardActions,
    Tooltip,
} from '@material-ui/core';

import NextIcon from '@material-ui/icons/SkipNext';
import PrevIcon from '@material-ui/icons/SkipPrevious';
import HideIcon from '@material-ui/icons/Visibility';
import ShowIcon from '@material-ui/icons/VisibilityOff';

interface Props {
    onClickNext: () => void;
    onClickPrev: () => void;
    onClickToggleVisibility: () => void;
    className: string;
    hidePast: boolean;
}

/**
 * ui for controlling the question queue
 */
export default React.memo(
    ({
        onClickNext,
        onClickPrev,
        onClickToggleVisibility,
        className,
        hidePast,
    }: Props) => {
        return (
            <Card className={className}>
                <CardHeader title='Controls' />
                <CardActions>
                    <Tooltip title='Previous Question'>
                        <IconButton onClick={onClickPrev}>
                            <PrevIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Toggle Past Question Visibility'>
                        <IconButton onClick={onClickToggleVisibility}>
                            {hidePast ? <ShowIcon /> : <HideIcon />}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Next Question'>
                        <IconButton onClick={onClickNext}>
                            <NextIcon />
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>
        );
    }
);
