import {createTheme} from '@mui/material/styles';

const themes = {
  'default': createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#FFA000',

      },
      secondary: {
        main: '#f50057',
      },
    },
  }),

  'light': createTheme({
    palette: {
      primary: {
        main: '#ffca28',
        contrastText: '#fff',
      },
      secondary: {
        main: '#9c27b0',
      },
    },
  }),

  'dark': createTheme({
    palette: {
      primary: {
        main: '#000000',
      },
      secondary: {
        main: '#9c27b0',
      },
    },
  }),

  'twin-light': createTheme({
    palette: {
      primary: {
        main: '#ffca28',
        contrastText: '#fff',
      },
      secondary: {
        main: '#9c27b0',
      },
    },
  }),

  'twin-dark': createTheme({
    palette: {
      primary: {
        main: '#000000',
      },
      secondary: {
        main: '#9c27b0',
      },
    },
  }),
};

export default themes;
