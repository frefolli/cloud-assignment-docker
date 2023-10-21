import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {MemoryRouter} from 'react-router-dom';
import {SnackbarProvider} from 'notistack';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <MemoryRouter>
      <SnackbarProvider maxSnack={4}>
        <App />
      </SnackbarProvider>
    </MemoryRouter>,
);

reportWebVitals();
