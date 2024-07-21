import './App.css';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Calendar from "./components/Calendar";

function App({children}) {
    function getTodoList(date) {
        console.log('api call get by date', date)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {children}
            <Calendar getTodoList={getTodoList}/>
        </LocalizationProvider>
    )
}

export default App;
