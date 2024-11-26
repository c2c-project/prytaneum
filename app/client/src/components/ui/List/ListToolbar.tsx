import Paper, { PaperProps } from '@mui/material/Paper';

interface ListToolbarProps extends PaperProps {
    children: React.ReactNode;
}

export const ListToolbar = ({ children, ...restProps }: ListToolbarProps) => (
    <Paper sx={{ padding: '1rem', marginX: '8px', marginBottom: '0.5rem' }} {...restProps}>
        {children}
    </Paper>
);
