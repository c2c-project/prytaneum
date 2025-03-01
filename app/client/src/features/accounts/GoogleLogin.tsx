import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const GoogleButton = styled(Button)(({}) => ({
    backgroundColor: '#fff',
    color: 'rgba(0, 0, 0, 0.54)',
    border: '1px solid #dadce0',
    textTransform: 'none',
    fontSize: 16,
    fontWeight: 500,
    padding: '10px 24px',
    borderRadius: 4,
    boxShadow: 'none',
    '&:hover': {
        backgroundColor: '#f7f8f8',
        boxShadow: 'none',
    },
}));

// Inline SVG for the Google icon
// TODO: Move this out to a separate file
const GoogleIcon = () => (
    <svg width='18' height='18' viewBox='0 0 48 48'>
        <path
            fill='#EA4335'
            d='M24 9.5c3.6 0 6.9 1.3 9.3 3.8l6.9-6.9C35.7 3.1 30.1 1 24 1 14.7 1 6.6 6.5 2.8 14.1l7.9 6.2C12.4 13 17.5 9.5 24 9.5z'
        />
        <path
            fill='#4285F4'
            d='M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.5c-.5 3-2.1 5.6-4.5 7.3l7 5.4C43.4 36.3 46.1 30.6 46.1 24.5z'
        />
        <path
            fill='#FBBC05'
            d='M10.7 28.4c-1.1-3.2-1.1-6.9 0-10.1l-7.9-6.2C.3 16.5 0 20.1 0 24c0 3.9.3 7.5.8 11.1l7.9-6.2z'
        />
        <path
            fill='#34A853'
            d='M24 47c6.1 0 11.2-2 14.9-5.4l-7-5.4c-2 1.3-4.5 2-7.9 2-5.5 0-10.2-3.7-11.8-8.7l-7.9 6.2C6.6 41.5 14.7 47 24 47z'
        />
        <path fill='none' d='M0 0h48v48H0z' />
    </svg>
);

export function GoogleLogin() {
    const handleLogin = () => {
        const currentUrl = window.location.href;
        // Redirect to your Fastify endpoint that starts the OAuth flow
        // Adjust the URL if your backend is on a different domain or port.
        window.location.href = `/api/auth/redirect/google?postAuthRedirectUrl=${currentUrl}`;
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <GoogleButton variant='contained' color='primary' onClick={handleLogin} startIcon={<GoogleIcon />}>
                Login with Google
            </GoogleButton>
        </div>
    );
}
