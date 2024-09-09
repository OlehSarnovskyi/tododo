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
        console.log(Telegram.initDataUnsafe.user.id);
        getTodoList(dayjs(date).format('DD.MM.YYYY'))
    }, [date])

    function getTodoList(date: string): void {
        setListByDate(getList().find(list => list.date === date)!)
    }

    return (
        <div className="app">
            {Telegram.initDataUnsafe.user.id}
            <div>
                <Calendar date={date} setDate={setDate}/>
                <TodoList date={date} list={listByDate}/>
            </div>
        </div>
    )
}

export default App
