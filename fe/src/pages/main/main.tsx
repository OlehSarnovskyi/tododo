import Calendar from "../../components/Calendar/Calendar";
import TodoList from "../../components/TodoList/TodoList";
import {forwardRef, useEffect, useState} from "react";
import dayjs from "dayjs";
import {getTasksByUserIdAndDate} from "../../services/tasks.service";
import {useApiWithSnackbar} from "../../services/api.service";
import {Link, LinkProps} from "react-router-dom";
import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PolicyIcon from '@mui/icons-material/Policy';
import {List} from "../../models/list";
import {DATE_FORMAT} from "../../constants";

const LinkBehavior = forwardRef<any, Omit<LinkProps, 'to'>>(
    (props, ref) => <Link ref={ref} to="/" {...props} role={undefined} />
);

function Main() {
    const api = useApiWithSnackbar()
    const [date, setDate] = useState(dayjs())
    const [tasksByUserIdAndDate, setTasksByUserIdAndDate] = useState<List.Task[]>([])

    useEffect(() => {
        getTasksByUserIdAndDate(api)(dayjs(date).format(DATE_FORMAT)).then(setTasksByUserIdAndDate)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date])

    let tgPlatform = false
    if (Telegram.WebApp.initDataUnsafe.user) {
        tgPlatform = true
    }

    const [bottomNavigation, setBottomNavigation] = useState();

    return (
        <>
            {tgPlatform
                ? <>
                    <div>
                        <Calendar date={date} setDate={setDate}/>
                        <TodoList
                            date={dayjs(date)}
                            tasks={tasksByUserIdAndDate}
                            setTasksByUserIdAndDate={setTasksByUserIdAndDate}/>
                    </div>
                    <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
                        <BottomNavigation
                            value={bottomNavigation}
                            onChange={(_, newValue) => {
                                setBottomNavigation(newValue)
                            }}
                        >
                            <BottomNavigationAction
                                value="how-to-use"
                                icon={<MenuBookIcon/>}
                                component={LinkBehavior}
                                to="how-to-use"
                            />
                            <BottomNavigationAction
                                value="additional-terms-of-service-and-privacy-policy"
                                icon={<PolicyIcon/>}
                                component={LinkBehavior}
                                to="additional-terms-of-service-and-privacy-policy"
                            />
                        </BottomNavigation>
                    </Paper>
                </>
                : <p>Run this telegram mini app by <a href="https://t.me/tododo_365_bot">@tododo_365_bot</a></p>}
        </>
    )
}


export default Main
