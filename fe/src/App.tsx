import './App.css';
import Calendar from "./components/Calendar/Calendar";
import TodoList from "./components/TodoList/TodoList";
import {getList} from "./services/local-storage.service";
import {useState} from "react";
import dayjs from "dayjs";

function App() {
    const [date, setDate] = useState(dayjs())
    const [listByDate, setListByDate] = useState({})

    function getTodoList(date: string): void {
        // TODO: help with initial call
        setListByDate(getList().find(list => list.date === date)!)
    }

    return (
        <div className="app">
            <Calendar date={date} setDate={setDate} getTodoList={getTodoList}/>
            <TodoList date={date} list={listByDate}/>
        </div>
    )
}

export default App
