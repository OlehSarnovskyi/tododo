import './App.css';
import {Outlet, Route, Routes} from "react-router-dom";
import Terms from "./pages/terms-of-service-and-privacy-policy/terms-of-service-and-privacy-policy";
import Main from "./pages/main/main";


function App() {
    return (
        <div className="app">
            <Routes>
                <Route exact path="/" element={<Main/>} />
                <Route path="/terms-of-service-and-privacy-policy" element={<Terms/>} />
            </Routes>
            <Outlet />
        </div>
    )
}

export default App
