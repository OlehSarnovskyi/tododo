import './App.css';
import {Outlet, Route, Routes} from "react-router-dom";
import Terms from "./pages/terms-of-service-and-privacy-policy/terms-of-service-and-privacy-policy";
import Main from "./pages/main/main";
import {useEffect, useState} from "react";
import {login} from "./services/login.service";
import {Alert, Snackbar} from "@mui/material";
import {useApiWithSnackbar} from "./services/api.service";
import LinearProgressBar from "./components/linear-progress-bar";
import HowToUse from "./pages/how-to-use/how-to-use";


function App() {
    const api = useApiWithSnackbar()
    const [snackbar, setSnackbar] = useState({
        open: false
    });

    useEffect(() => {
        if (Telegram.WebApp.initDataUnsafe.user) {
            login(api).then((message) => {
                if (message) {
                    setSnackbar({
                        open: true,
                        message
                    })
                }
            })
        }
    }, [])

    return (
        <div className="app">
            <LinearProgressBar/>
            <div className="app__container">
                <Routes>
                    <Route exact path="/" element={<Main/>}/>
                    <Route path="/how-to-use" element={<HowToUse/>}/>
                    <Route path="/additional-terms-of-service-and-privacy-policy" element={<Terms/>}/>
                </Routes>
                <Outlet/>
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={2000}
                    onClose={() => setSnackbar({open: false})}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                >
                    <Alert severity="info">
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </div>
        </div>
    )
}

export default App
