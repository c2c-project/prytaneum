import { createMuiTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
        custom: {
            borderRadius: string;
            maxHW: {
                height: string;
                width: string;
            };
            media: {
                minHeight: string;
            };
        };
    }
    // allow configuration using `createMuiTheme`
    interface ThemeOptions {
        custom?: {
            borderRadius?: string;
            maxHW?: {
                height: string;
                width: string;
            };
            media?: {
                minHeight: string;
            };
        };
    }
}

export default createMuiTheme({
    palette: {
        primary: { main: '#0074bc' },
        secondary: { main: '#fdb813' },
        background: {paper: '#F6F6F6'}
    },
    typography: {
        button: {
            lineHeight: '1.75em',
            // fontSize: 'rem',
        },
    },
    custom: {
        borderRadius: '18px',
        maxHW: {
            height: '100%',
            width: '100%',
        },
        media: {
            minHeight: '300px',
        },
    },
});
