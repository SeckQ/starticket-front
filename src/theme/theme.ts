// src/theme/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Azul MUI
        },
        secondary: {
            main: '#9c27b0', // Púrpura MUI
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial',
    },
});

export default theme;