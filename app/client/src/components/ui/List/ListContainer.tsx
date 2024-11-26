import Stack, { StackProps } from '@mui/material/Stack';

interface ListContainerProps extends StackProps {
    children: React.ReactNode;
}

export const ListContainer = ({ children, ...restProps }: ListContainerProps) => (
    <Stack direction='column' alignItems='stretch' width='100%' padding={1} paddingRight={0} {...restProps}>
        {children}
    </Stack>
);
