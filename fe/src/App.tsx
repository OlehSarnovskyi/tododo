import './App.css';
import Calendar from "./components/Calendar/Calendar";
import TodoList from "./components/TodoList/TodoList";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import {login} from "./services/login.service";
import {getTasksByUserIdAndDate} from "./services/tasks.service";


function App() {
    const [date, setDate] = useState(dayjs())
    const [tasksByUserIdAndDate, setTasksByUserIdAndDate] = useState([])

    useEffect(() => {
        if (Telegram.WebApp.initDataUnsafe.user) {
            login()
        }
    }, [])
    
    useEffect(() => {
        const formattedDate = dayjs(date).format('DD.MM.YYYY')
        getTasksByUserIdAndDate(formattedDate).then(tasks => {
            setTasksByUserIdAndDate(tasks)
        })
    }, [date])

    let tgPlatform = false
    if (Telegram.WebApp.initDataUnsafe.user) {
        tgPlatform = true
    }

    return (
        <div className="app">
            {tgPlatform
            ? <div className="app__container">
                <Calendar date={date} setDate={setDate}/>
                <TodoList
                    date={dayjs(date).format('DD.MM.YYYY')}
                    tasks={tasksByUserIdAndDate}
                    setTasksByUserIdAndDate={setTasksByUserIdAndDate}/>
            </div>
            : <p>Run this telegram mini app by <a href="https://t.me/tododo_365_bot">@tododo_365_bot</a></p>}
        </div>
    )
}

export default App
