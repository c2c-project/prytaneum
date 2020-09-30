import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

interface Props {
    children: JSX.Element;
    tooltip: string;
    onClick: () => void;
    className?: string;
}

/** Displays the ToolTip when the mouse is over the IconButton
 *  @category Component
 *  @constructor ToolTipIconButton
 *  @param props
 *  @param {JSX.Element} props.children content of IconButton
 *  @param {string} props.tooltip what is displayed when the mouse hovers over the IconButton
 *  @param {"() => void"} props.onClick function to call when the button is clicked
 *  @param {string | undefind} props.className className for CSS, could be blank
*/
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

TooltipIconButton.defaultProps = {
    className: '',
};
