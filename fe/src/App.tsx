import './App.css';
import {Outlet, Route, Routes} from "react-router-dom";
import Terms from "./pages/terms-of-service-and-privacy-policy/terms-of-service-and-privacy-policy";
import Main from "./pages/main/main";
import {useEffect, useState} from "react";
import {login} from "./services/login.service";
import {Alert, Snackbar} from "@mui/material";
import {useApiWithSnackbar} from "./services/api.service";
import LinearProgressBar from "./components/linear-progress-bar";


function App() {
    const api = useApiWithSnackbar()
    const [snackbar, setSnackbar] = useState({
        open: false
    });

    useEffect(() => {
        if (Telegram.WebApp.initDataUnsafe.user) {
            login(api).then((message) => {
                setSnackbar({
                    open: true,
                    message
                })
            })
        }
    }, [])

    return (
        <div className="app">
            <LinearProgressBar/>
            <Routes>
                <Route exact path="/" element={<Main/>} />
                <Route path="/additional-terms-of-service-and-privacy-policy" element={<Terms/>} />
            </Routes>
            <Outlet />
            <Snackbar
                open={snackbar.open}
                autoHideDuration={2000}
                onClose={() => setSnackbar({open: false})}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            >
                <Alert severity="info">
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default App
