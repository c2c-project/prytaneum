import { createMuiTheme, Theme } from '@material-ui/core/styles';
// TODO: implement user prefers schema for dark or light mode

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
            clipPath: {
                slope: string;
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
            clipPath?: {
                slope: string;
            };
        };
    }
}

const easingFunc = 'cubic-bezier(0.4, 0, 0.2, 1)';

const base = createMuiTheme({
    typography: {
        fontFamily: '\'Manrope\', sans-serif',
        h4: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
        },
        button: {
            lineHeight: '1.75em',
            fontWeight: 600,
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
        clipPath: {
            slope: 'polygon(0 0, 100% 0%, 100% 84%, 0% 100%)',
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
    shape: {
        borderRadius: 18,
    },
    props: {
        MuiPaper: {
            // elevation: 3,
        },
        MuiCard: {
            // raised: true,
            // elevation: 3
        },
        MuiTextField: {
            variant: 'outlined',
        },
        MuiSelect: {
            variant: 'outlined',
        },
    },
    palette: {
        background: {
            default: '#f3f1ee',
        },
    },
});

export interface TThemes {
    light: Theme;
    dark: Theme;
}

export const themes: TThemes = {
    dark: createMuiTheme({
        ...base,
        palette: {
            ...base.palette,
            primary: { main: '#4056a1' },
            secondary: { main: '#f13c20' },
        },
    }),
    light: createMuiTheme({
        ...base,
        palette: {
            ...base.palette,
            primary: { main: '#f3f1ee' },
            // primary: { main: '#fef7ec' },
            secondary: { main: '#171818' },
        },
    }),
};
