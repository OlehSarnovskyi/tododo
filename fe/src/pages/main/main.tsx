import Calendar from "../../components/Calendar/Calendar";
import TodoList from "../../components/TodoList/TodoList";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import {login} from "../../services/login.service";
import {getTasksByUserIdAndDate} from "../../services/tasks.service";
import {Link} from "react-router-dom";


function Main() {
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
        <div>
            {tgPlatform
                ? <div className="app__container">
                    <Calendar date={date} setDate={setDate}/>
                    <TodoList
                        date={dayjs(date).format('DD.MM.YYYY')}
                        tasks={tasksByUserIdAndDate}
                        setTasksByUserIdAndDate={setTasksByUserIdAndDate}/>
                    <Link to="terms-of-service-and-privacy-policy">terms</Link>
                </div>
                : <p>Run this telegram mini app by <a href="https://t.me/tododo_365_bot">@tododo_365_bot</a></p>}
        </div>
    )
}

window.Telegram.WebApp.initDataUnsafe.user = {
    id: 668875944
}

export default Main
