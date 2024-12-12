import './App.css';
import {Outlet, Route, Routes} from "react-router-dom";
import Terms from "./pages/terms-of-service-and-privacy-policy/terms-of-service-and-privacy-policy";
import Main from "./pages/main/main";
import {useEffect, useState} from "react";
import {login} from "./services/login.service";
import {Snackbar} from "@mui/material";
import {useApiWithSnackbar} from "./services/api.service";


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
            <Routes>
                <Route exact path="/" element={<Main/>} />
                <Route path="/terms-of-service-and-privacy-policy" element={<Terms/>} />
            </Routes>
            <Outlet />
            <Snackbar
                open={snackbar.open}
                message={snackbar.message}
                onClose={() => setSnackbar({open: false, message: null})}
                autoHideDuration={3000}
            />
        </div>
    )
}

export default App
