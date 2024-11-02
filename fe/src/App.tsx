import './App.css';
import Calendar from "./components/Calendar/Calendar";
import TodoList from "./components/TodoList/TodoList";
import {getList} from "./services/local-storage.service";
import {useEffect, useState} from "react";
import dayjs from "dayjs";

function App() {
    const [date, setDate] = useState(dayjs())
    const [listByDate, setListByDate] = useState({tasks: []})

    function login() {
        fetch('https://c789-85-216-179-112.ngrok-free.app/users/login/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: Telegram.WebApp.initDataUnsafe.user?.id
            }),
        }).then(() => {
            // show tooltip
        })
    }

    useEffect(() => {
        if (Telegram.WebApp.initDataUnsafe.user) {
            login()
        }
    }, [])
    
    useEffect(() => {
        getTodoList(dayjs(date).format('DD.MM.YYYY'))
    }, [date])

    function getTodoList(date: string): void {
        setListByDate(getList().find(list => list.date === date)!)
    }

    let tgPlatform = false
    if (Telegram.WebApp.initDataUnsafe.user) {
        tgPlatform = true
    }

    return (
        <div className="app">
            {tgPlatform
            ? <div className="app__container">
                <Calendar date={date} setDate={setDate}/>
                <TodoList date={date} list={listByDate}/>
            </div>
            : <p>Run this telegram mini app by <a href="https://t.me/tododo_365_bot">@tododo_365_bot</a></p>}
        </div>
    )
}

export default App
