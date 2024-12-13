import Calendar from "../../components/Calendar/Calendar";
import TodoList from "../../components/TodoList/TodoList";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import {getTasksByUserIdAndDate} from "../../services/tasks.service";
import Link from '@mui/material/Link';
import {useApiWithSnackbar} from "../../services/api.service";
import {useNavigate} from "react-router-dom";


function Main() {
    const api = useApiWithSnackbar()
    const navigate = useNavigate()
    const [date, setDate] = useState(dayjs())
    const [tasksByUserIdAndDate, setTasksByUserIdAndDate] = useState([])

    // TODO: call in App
    useEffect(() => {
        const formattedDate = dayjs(date).format('DD.MM.YYYY')
        getTasksByUserIdAndDate(api)(formattedDate).then(tasks => {
            setTasksByUserIdAndDate(tasks)
        })
    }, [date])

    let tgPlatform = false
    if (Telegram.WebApp.initDataUnsafe.user) {
        tgPlatform = true
    }

    return (
        <>
            {tgPlatform
                ? <div className="app__container">
                    <div>
                        <Calendar date={date} setDate={setDate}/>
                        <TodoList
                            date={dayjs(date)}
                            tasks={tasksByUserIdAndDate}
                            setTasksByUserIdAndDate={setTasksByUserIdAndDate}/>
                    </div>
                    <Link className="link-terms" onClick={() => navigate('terms-of-service-and-privacy-policy')}>Terms of service and privacy policy</Link>
                  </div>
                : <p>Run this telegram mini app by <a href="https://t.me/tododo_365_bot">@tododo_365_bot</a></p>}
        </>
    )
}


export default Main
