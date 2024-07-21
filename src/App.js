import './App.css';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Calendar from "./components/Calendar/Calendar";
import TodoList from "./components/TodoList/TodoList";

function App({children}) {
    function getTodoList(date) {
        console.log('api call get by date', date)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {children}
            <div className="App">
                <Calendar getTodoList={getTodoList}/>
                <TodoList/>
            </div>
        </LocalizationProvider>
    )
}

export default App;
