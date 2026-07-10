import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {SnackbarProvider} from "./services/snackbar.service";
import {createTheme, ThemeProvider} from "@mui/material";
import {LoadingProvider} from "./services/loading.service";

// Warm Sand / Taupe — calm, low-saturation palette for focus
const theme = createTheme({
    palette: {
        primary: {
            main: '#9C6B4F',
            light: '#C89B7B',
            dark: '#7E5238',
            contrastText: '#ffffff'
        },
        secondary: {
            main: '#C89B7B'
        },
        background: {
            default: '#F7F4F0',
            paper: '#FFFFFF'
        },
        text: {
            primary: '#3B332C',
            secondary: '#7A6E63'
        },
        divider: '#ECE5DD'
    },
    shape: {
        borderRadius: 10
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <SnackbarProvider>
                    <LoadingProvider>
                        <App/>
                    </LoadingProvider>
                </SnackbarProvider>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
