import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

interface Props {
    children: JSX.Element;
    tooltip: string;
    onClick: () => void;
    className?: string;
}

export default function TooltipIconButton({
    children,
    tooltip,
    onClick,
    className,
}: Props) {
    return (
        <Tooltip
            title={tooltip}
            aria-label={tooltip.toLowerCase()}
            className={className}
        >
            <IconButton onClick={onClick}>{children}</IconButton>
        </Tooltip>
    );
}
