import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00a82d',
    },
    background: {
      default: '#f7f7f7',
      paper: '#ffffff',
    },
    text: {
        primary: '#202020',
        secondary: '#5c5c5c'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Merriweather", "Georgia", serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Merriweather", "Georgia", serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"Merriweather", "Georgia", serif',
      fontWeight: 700,
    },
    h4: {
      fontFamily: '"Merriweather", "Georgia", serif',
      fontWeight: 700,
    },
    h5: {
        fontFamily: '"Merriweather", "Georgia", serif',
        fontWeight: 700,
    },
    h6: {
        fontFamily: '"Merriweather", "Georgia", serif',
        fontWeight: 700,
    }
  },
});

export default theme; 