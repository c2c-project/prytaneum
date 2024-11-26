import Stack, { StackProps } from '@mui/material/Stack';

interface ListActionsContainerProps extends StackProps {
    isExpanded?: boolean;
    children: React.ReactNode;
}

export function ListActionsContainer({ isExpanded = false, children, ...restProps }: ListActionsContainerProps) {
    return (
        <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            marginBottom={isExpanded ? '.5rem' : '0rem'}
            {...restProps}
        >
            {children}
        </Stack>
    );
}
