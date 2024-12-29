import Calendar from "../../components/Calendar/Calendar";
import TodoList from "../../components/TodoList/TodoList";
import {forwardRef, useEffect, useState} from "react";
import dayjs from "dayjs";
import {getTasksByUserIdAndDate} from "../../services/tasks.service";
import {useApiWithSnackbar} from "../../services/api.service";
import {Link, LinkProps} from "react-router-dom";
import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";
import MenuBookIcon from '@mui/icons-material/MenuBook';

const LinkBehavior = forwardRef<any, Omit<LinkProps, 'to'>>(
    (props, ref) => <Link ref={ref} to="/" {...props} role={undefined} />
);

function Main() {
    const api = useApiWithSnackbar()
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

    const [bottomNavigation, setBottomNavigation] = useState();

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
                    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                        <BottomNavigation
                            value={bottomNavigation}
                            onChange={(_, newValue) => {
                                setBottomNavigation(newValue)
                            }}
                        >
                            <BottomNavigationAction
                                label="How to use"
                                value="how-to-use"
                                icon={<MenuBookIcon />}
                                component={LinkBehavior}
                                to="how-to-use"
                            />
                        </BottomNavigation>
                    </Paper>
                  </div>
                : <p>Run this telegram mini app by <a href="https://t.me/tododo_365_bot">@tododo_365_bot</a></p>}
        </>
    )
}


export default Main
