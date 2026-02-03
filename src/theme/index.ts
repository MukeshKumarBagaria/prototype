'use client';

import { createTheme } from '@mui/material/styles';

// Color palette based on the design system
export const colors = {
    primary: {
        50: '#D4E3F7',
        100: '#A8C6F0',
        200: '#7DAAE8',
        300: '#528DE0',
        400: '#2671D9',
        500: '#1C53A0',
        600: '#174482',
        700: '#13386C',
        800: '#0F2D57',
        900: '#0B2241',
    },
    secondary: {
        50: '#FCF8E8',
        100: '#F9F1D2',
        200: '#F5E4A3',
        300: '#F0D775',
        400: '#EBCA47',
        500: '#E5BD19',
        600: '#B89714',
        700: '#746325',
        800: '#5C4B0A',
        900: '#453908',
    },
    // Semantic colors
    error: {
        main: '#EF4444',
        light: '#FEF2F2',
        dark: '#DC2626',
    },
    success: {
        main: '#22C55E',
        light: '#F0FDF4',
        dark: '#16A34A',
    },
    warning: {
        main: '#F59E0B',
        light: '#FFFBEB',
        dark: '#D97706',
    },
    // Neutral colors
    slate: {
        50: '#F8FAFC',
        100: '#F1F5F9',
        200: '#E2E8F0',
        300: '#CBD5E1',
        400: '#94A3B8',
        500: '#64748B',
        600: '#475569',
        700: '#334155',
        800: '#1E293B',
        900: '#0F172A',
    },
};

// Create the MUI theme
const theme = createTheme({
    typography: {
        fontFamily: '"Noto Sans", system-ui, sans-serif',
        fontSize: 14,
        h1: { fontWeight: 600 },
        h2: { fontWeight: 600 },
        h3: { fontWeight: 600 },
        h4: { fontWeight: 600 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
        body1: { fontSize: '14px' },
        body2: { fontSize: '14px' },
        button: {
            fontSize: '16px',
            textTransform: 'none' as const,
            fontWeight: 500,
        },
    },
    palette: {
        primary: {
            main: colors.primary[500],
            light: colors.primary[300],
            dark: colors.primary[700],
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: colors.secondary[500],
            light: colors.secondary[300],
            dark: colors.secondary[700],
            contrastText: '#000000',
        },
        error: colors.error,
        success: colors.success,
        warning: colors.warning,
        background: {
            default: colors.slate[50],
            paper: '#FFFFFF',
        },
        text: {
            primary: colors.slate[800],
            secondary: colors.slate[500],
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '16px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
                sizeMedium: {
                    height: 48,
                    paddingLeft: 24,
                    paddingRight: 24,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                        height: 44,
                        '&:hover fieldset': {
                            borderColor: colors.primary[500],
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: colors.primary[500],
                        },
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    height: 44,
                },
            },
        },
        MuiRadio: {
            styleOverrides: {
                root: {
                    color: colors.primary[500],
                    '&.Mui-checked': {
                        color: colors.primary[500],
                    },
                },
            },
        },
        MuiSwitch: {
            styleOverrides: {
                root: {
                    '& .MuiSwitch-switchBase.Mui-checked': {
                        color: colors.primary[500],
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: colors.primary[500],
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
                    border: `1px solid ${colors.slate[200]}`,
                },
            },
        },
    },
});

export default theme;
