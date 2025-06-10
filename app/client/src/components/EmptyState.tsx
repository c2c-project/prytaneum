import { Grid, Typography } from '@mui/material';

interface EmptyStateProps {
    message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => (
    <Grid height='25vh'>
        <Typography textAlign='center' fontWeight='bold'>
            {message}
        </Typography>
    </Grid>
);

export default EmptyState;
