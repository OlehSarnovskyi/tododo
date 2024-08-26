import './App.css';
import Calendar from "./components/Calendar/Calendar";
import TodoList from "./components/TodoList/TodoList";
import {getList} from "./services/local-storage.service";
import {useEffect, useState} from "react";
import dayjs from "dayjs";

function App() {
    const [date, setDate] = useState(dayjs())
    const [listByDate, setListByDate] = useState({})

    useEffect(() => {
        getTodoList(dayjs(date).format('DD.MM.YYYY'))
    }, [date])

    function getTodoList(date: string): void {
        setListByDate(getList().find(list => list.date === date)!)
    }

    return (
        <div className="app">
            <Calendar date={date} setDate={setDate}/>
            <TodoList date={date} list={listByDate}/>
        </div>
    )
}

export default App
