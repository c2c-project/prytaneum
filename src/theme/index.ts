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

const easingFunc = 'cubic-bezier(0.4, 0, 0.2, 1)';

export default createMuiTheme({
    palette: {
        primary: { main: '#0074bc' },
        secondary: { main: '#fdb813' },
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
    transitions: {
        easing: {
            easeIn: easingFunc,
            easeInOut: easingFunc,
            easeOut: easingFunc,
            sharp: easingFunc,
        },
    },
});
