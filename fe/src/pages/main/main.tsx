import Calendar from "../../components/Calendar/Calendar";
import TodoList from "../../components/TodoList/TodoList";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import {login} from "../../services/login.service";
import {getTasksByUserIdAndDate} from "../../services/tasks.service";
import {Link} from "react-router-dom";
import {Snackbar} from "@mui/material";
import {useApiWithSnackbar} from "../../services/api.service";


function Main() {
    const api = useApiWithSnackbar()
    const [date, setDate] = useState(dayjs())
    const [tasksByUserIdAndDate, setTasksByUserIdAndDate] = useState([])
    const [snackbar, setSnackbar] = useState({
        open: false
    });

    useEffect(() => {
        if (Telegram.WebApp.initDataUnsafe.user) {
            login(api).then((message) => {
                setSnackbar({
                    open: true,
                    message
                })
            })
        }
    }, [])

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
        <div>
            {tgPlatform
                ? <div className="app__container">
                    <Calendar date={date} setDate={setDate}/>
                    <TodoList
                        date={dayjs(date).format('DD.MM.YYYY')}
                        tasks={tasksByUserIdAndDate}
                        setTasksByUserIdAndDate={setTasksByUserIdAndDate}/>
                    <Snackbar
                        open={snackbar.open}
                        message={snackbar.message}
                        onClose={() => setSnackbar({open: false, message: null})}
                        autoHideDuration={5000}
                    />
                    <Link to="terms-of-service-and-privacy-policy">Terms of service and privacy policy</Link>
                </div>
                : <p>Run this telegram mini app by <a href="https://t.me/tododo_365_bot">@tododo_365_bot</a></p>}
        </div>
    )
}


export default Main
