import React from 'react';
import { CardHeader, IconButton, Card, CardActions, Tooltip, Badge } from '@material-ui/core';

import NextIcon from '@material-ui/icons/SkipNext';
import PrevIcon from '@material-ui/icons/SkipPrevious';
import HideIcon from '@material-ui/icons/Visibility';
import ShowIcon from '@material-ui/icons/VisibilityOff';
import RefreshIcon from '@material-ui/icons/Refresh';

interface Props {
    onClickNext: () => void;
    onClickPrev: () => void;
    onClickToggleVisibility: () => void;
    onClickRefresh: () => void;
    className: string;
    hidePast: boolean;
    bufferLength: number;
}

/**
 * ui for controlling the question queue
 */
export default React.memo(
    ({
        onClickNext,
        onClickPrev,
        onClickToggleVisibility,
        onClickRefresh,
        className,
        hidePast,
        bufferLength,
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
                    <Tooltip title='Refresh'>
                        <span>
                            <IconButton
                                disabled={bufferLength === 0}
                                // on purpose to get rid of synthetic event being passed up
                                onClick={() => onClickRefresh()}
                            >
                                <Badge color='secondary' badgeContent={bufferLength}>
                                    <RefreshIcon />
                                </Badge>
                            </IconButton>
                        </span>
                    </Tooltip>
                </CardActions>
            </Card>
        );
    }
);
